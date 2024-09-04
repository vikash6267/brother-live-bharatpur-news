const LiveStreamModel = require("../models/liveStreaming");

const createLiveStream = async (req, res) => {
  try {
    const { name, active, url = "" } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    const liveStream = await LiveStreamModel.create({
      name,
      active,
      url,
    });

    return res.status(201).json({
      success: true,
      message: "Live stream created successfully!",
      liveStream,
    });
  } catch (error) {
    console.error("Error in create live stream api:", error);
    return res.status(500).json({
      success: false,
      message: "Error in create live stream api!",
    });
  }
};

const getAllLiveStreams = async (req, res) => {
  try {
    const liveStreams = await LiveStreamModel.find({});

    if (!liveStreams || liveStreams.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No live streams found",
      });
    }

    return res.status(200).json({
      success: true,
      totalLiveStreams: liveStreams.length,
      liveStreams,
    });
  } catch (error) {
    console.error("Error in getting live streams api:", error);
    return res.status(500).json({
      success: false,
      message: "Error in getting live streams api!",
    });
  }
};

const deleteLiveStream = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLiveStream = await LiveStreamModel.findByIdAndDelete(id);

    if (!deletedLiveStream) {
      return res.status(404).json({
        success: false,
        message: "Live stream not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Live stream deleted successfully!",
    });
  } catch (error) {
    console.error("Error in deleting live stream api:", error);
    return res.status(500).json({
      success: false,
      message: "Error in deleting live stream api!",
    });
  }
};

const updateLiveStreamStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const updatedLiveStream = await LiveStreamModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!updatedLiveStream) {
      return res.status(404).json({
        success: false,
        message: "Live stream not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedLiveStream,
    });
  } catch (error) {
    console.error("Error in updating live stream status:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating live stream status!",
    });
  }
};



const updateLiveStream = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, active, url } = req.body;

    if (!id || !name || active === undefined || !url) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    const liveStream = await LiveStreamModel.findByIdAndUpdate(
      id,
      { name, active, url },
      { new: true, runValidators: true }
    );

    if (!liveStream) {
      return res.status(404).json({
        success: false,
        message: "Live stream not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Live stream updated successfully!",
      liveStream,
    });
  } catch (error) {
    console.error("Error in update live stream api:", error);
    return res.status(500).json({
      success: false,
      message: "Error in update live stream api!",
    });
  }
};


module.exports = {
  createLiveStream,
  getAllLiveStreams,
  deleteLiveStream,
  updateLiveStreamStatus,
  updateLiveStream
};
