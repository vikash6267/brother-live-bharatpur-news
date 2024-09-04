const breakingNewsModel = require("../models/breakingNews");


const createBreakingNewsCtrl = async (req, res) => {
    try {
        const { name, active, url = "" } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            })
        }

        const breakingNews = await breakingNewsModel.create({
            name, active, url
        })

        return res.status(201).json({
            success: true,
            message: "Breaking News created successfully!",
            breakingNews
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in create breaking news api!"
        })
    }
}

const getAllBreakingNews = async (req, res) => {
    try {

        const breakingNewss = await breakingNewsModel.find({});
        if (!breakingNewss) {
            return res.status(400).json({
                success: false,
                message: "No breaking news found"
            })
        }
        return res.status(200).json({
            success: true,
            totalNewss: breakingNewss.length,
            breakingNewss
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in getting breaking news api!"
        })
    }
}

const deleteBreakingNews = async (req, res) => {
    try {
        const { id } = req.params;
        await breakingNewsModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "breaking news delete successfully!"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in deleting breaking news api!"
        })
    }
}

const updateStatusCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body;
        const news = await breakingNewsModel.findByIdAndUpdate(id, { active }, { new: true })
        return res.status(200).json({
            success: true,
            news
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error in update state of breaking news",
        })
    }
}
module.exports = { createBreakingNewsCtrl, getAllBreakingNews, deleteBreakingNews, updateStatusCtrl }