const ytModel = require("../models/youTubeVideo");

const createYTVideo = async (req, res) => {
    try {
        const { url, type } = req.body;
        const yt = await ytModel.create({ url, type });
        return res.status(201).json({
            success: true,
            message: "Yt Video created successfully!",
            yt
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating youtube video"
        })
    }
}
const getYTVideo = async (req, res) => {
    try {

        const videos = await ytModel.find({});
        return res.status(200).json({
            success: true,
            message: "Yt Video get successfully!",
            videos
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting all  youtube video"
        })
    }
}

const deleteYTVideoCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        await ytModel.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Youtube Video deleted successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in deleting ads api!"
        })
    }
}

module.exports = { createYTVideo, getYTVideo, deleteYTVideoCtrl }