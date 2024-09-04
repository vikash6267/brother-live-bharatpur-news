const express = require("express")
const { createYTVideo, getYTVideo, deleteYTVideoCtrl } = require("../controllers/ytVideoCtrl")
const router = express.Router()


router.post("/create", createYTVideo)
router.get("/getAll", getYTVideo)
router.delete("/delete/:id", deleteYTVideoCtrl)


module.exports = router