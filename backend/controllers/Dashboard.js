const User = require('../models/authModel');
const TrackVisit = require('../models/trackVisit');
const News = require('../models/newsModel');
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Count only users with role "user"
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalVisitsRecord = await TrackVisit.findOne();
    const totalVisits = totalVisitsRecord ? totalVisitsRecord.visit : 0;
    const totalNews = await News.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalSubCategories = await SubCategory.countDocuments();

    res.status(200).json({
      totalUsers,
      totalVisits,
      totalNews,
      totalCategories,
      totalSubCategories,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};




const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }, 'name email location createdAt');
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};


module.exports = {
  getDashboardStats,
  getUsers
};
