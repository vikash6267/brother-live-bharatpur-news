const express = require("express")
const { createContactCtrl } = require("../controllers/contactCtrl")
const router = express.Router()


router.post("/create", createContactCtrl)



module.exports = router