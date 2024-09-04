const Poll = require('../models/pollModel');

const createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;
        const newPoll = new Poll({ question, options });
        const savedPoll = await newPoll.save();
        res.status(201).json(savedPoll);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get all polls
const getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Vote for an option in a poll
const voteInPoll = async (req, res) => {
    try {
        const { id } = req.params;
        const { optionId } = req.body;

        const poll = await Poll.findById(id);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        const option = poll.options.find(opt => opt._id == optionId);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }

        option.votes++;
        await poll.save();

        res.json(poll);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deletePollCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        await Poll.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Poll deleted successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in delete poll api!"

        })
    }
}





module.exports = { createPoll, getAllPolls, voteInPoll, deletePollCtrl };
