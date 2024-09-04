const express = require("express")
const { createPoll, getAllPolls, voteInPoll, deletePollCtrl } = require("../controllers/pollCtrl")
const router = express.Router()

router.post("/create", createPoll)
router.get("/get", getAllPolls)
router.put("/vote/:id", voteInPoll)
router.delete("/delete/:id", deletePollCtrl)


module.exports = router