const express = require('express');
const router = express.Router();
const { getDashboardStats,getUsers } = require('../controllers/Dashboard');
const {incrementVisitCount} = require("../controllers/trackVisit")
// Route to get dashboard statistics
router.get('/dashboard', getDashboardStats);
router.post('/visit', incrementVisitCount);
router.get('/users', getUsers);

module.exports = router;
