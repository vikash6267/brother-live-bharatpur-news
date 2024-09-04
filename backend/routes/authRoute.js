const express = require("express")
const { registerCtrl, loginCtrl ,compareOtp,sendotp} = require("../controllers/authCtrl")
const router = express.Router()


router.post("/login", loginCtrl)
router.post("/register", registerCtrl)
router.post("/sentotp", sendotp)
router.post("/verifyotp", compareOtp)


module.exports = router