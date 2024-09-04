const TrackVisit = require('../models/trackVisit');

// Increment visit count by 1
const incrementVisitCount = async (req, res) => {
  try {
    const visitRecord = await TrackVisit.findOne();
    
    if (!visitRecord) {
      const newVisitRecord = new TrackVisit({ visit: 1 });
      await newVisitRecord.save();
      return res.status(201).json({ visit: newVisitRecord.visit });
    }

    visitRecord.visit += 1;
    await visitRecord.save();
    res.status(200).json({ visit: visitRecord.visit });
  } catch (error) {
    res.status(500).json({ error: 'Failed to increment visit count' });
  }
};

// Get current visit count
const getVisitCount = async (req, res) => {
  try {
    const visitRecord = await TrackVisit.findOne();
    
    if (!visitRecord) {
      return res.status(200).json({ visit: 0 });
    }

    res.status(200).json({ visit: visitRecord.visit });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get visit count' });
  }
};

module.exports = {
  incrementVisitCount,
  getVisitCount
};
