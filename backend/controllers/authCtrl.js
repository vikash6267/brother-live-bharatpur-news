const bcrypt = require("bcrypt");
const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")



const registerCtrl = async (req, res) => {
  try {
    const { name, email, password,location } = req.body;

    if (!name || !email || !password || !location) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authModel.create({
      name,
      email,
      location,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // Set cookie for token
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options);




    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET
      );

      user.token = token;
      user.password = undefined;
      const options = {
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};



const sendotp = async (req, res,next) => {
  try {
    const { email } = req.body

 

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })
    const result = await OTP.findOne({ otp: otp })
    console.log("Result is Generate OTP Func")
    console.log("OTP", otp)
    console.log("Result", result)
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      })
    }
    const otpPayload = { email, otp }
    const otpBody = await OTP.create(otpPayload)
    console.log("OTP Body", otpBody)
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: error.message })
  }
}




const compareOtp = async(req, res)=>{
  try {
    console.log("hello")
    const {otp,email} = req.body

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)

    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    }



     // Check if user already exists
     const existingUser = await authModel.findOne({ email })
     if (!existingUser) {
       return res.status(200).json({
         success: true,
         userFind:false,
         message:"Your Not Admin Please Contact To SuperAdmin"
       })
     }


     const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET
    )

    // Save token to user document in database
    existingUser.token = token
    existingUser.password = undefined
    // Set cookie for token and return success response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    res.cookie("token", token, options).status(200).json({
      success: true,
      userFind:true,
      token,
      existingUser,
      message: `User Login Success`,
    })






    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
       success: false, 
       error: error.message })
  }
}

module.exports = { registerCtrl, loginCtrl,sendotp,compareOtp };
