// routesRoutes.js
const express = require('express');
const router = express.Router();
const {
  createNews,
  updateNewsById,
  toggleActive,
  getAllNews,
  deleteNewsById,
  getNewsById,
  getAllNotifications,
  likePost,
  commentOnPost,
  removelikePost,
} = require('../controllers/news');

const { auth, isUser, isAdmin } = require("../middleware/auth");


router.post('/create',auth, createNews);

router.put('/update', updateNewsById);

router.put('/toggleActive', toggleActive);

router.get('/all', getAllNews);

router.delete('/delete', deleteNewsById);

router.get('/:newsId', getNewsById);



router.post('/notifications', getAllNotifications);



router.post("/like", auth, likePost);
router.post("/removelike", auth, removelikePost);

// Comment on a community post - accessible by authenticated users
router.post("/comment", auth, commentOnPost);


module.exports = router;
