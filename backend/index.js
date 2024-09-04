const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
//routes
const authRoutes = require("./routes/authRoute")
const newsRoutes = require("./routes/newsRoute")
const categoryRoutes = require("./routes/categoryRoutes")
const subcategoryRoutes = require("./routes/subcategoryRoutes")
const imageRoute = require("./routes/imageRoute");
const adminRoutes = require("./routes/adminAccess")

dotenv.config();

const PORT = process.env.PORT || 8080
connectDB();



// middleware 
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

// cloudinary connect 
cloudinaryConnect();


// routes  
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/news", newsRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/subcategory", subcategoryRoutes)
app.use("/api/v1/image", imageRoute);
app.use("/api/v1/breakingNews", require("./routes/breakingNewsRoute"));
app.use("/api/v1/live", require("./routes/liveStream"));
app.use("/api/v1/poll", require("./routes/pollRoute"));
app.use("/api/v1/ads", require("./routes/adsRoute"));
app.use("/api/v1/yt", require("./routes/ytVideoRoute"));
app.use("/api/v1/", require("./routes/dashboardRoutes"));
app.use("/api/v1/contact", require("./routes/contactRoute"));







// default route 
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ..."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port no ${PORT}`)
})
