const express = require("express")
const { createBreakingNewsCtrl, getAllBreakingNews, deleteBreakingNews, updateStatusCtrl } = require("../controllers/breakingNews")
const router = express.Router()


router.post("/create", createBreakingNewsCtrl)
router.get("/getAll", getAllBreakingNews)
router.delete("/delete/:id", deleteBreakingNews)
router.put("/update/:id", updateStatusCtrl)


module.exports = router