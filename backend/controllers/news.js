// controllers/newsController.js
const News = require('../models/newsModel')
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const Notification = require("../models/notification")
const User = require("../models/authModel")
// Function to validate category ID
const validateCategory = async (categoryId) => {
  return await Category.exists({ _id: categoryId });
};

// Function to validate subcategory ID
const validateSubCategory = async (subcategoryId) => {
  return await SubCategory.exists({ _id: subcategoryId });
};

// Function to check if all required fields are present
const validateRequiredFields = (req) => {
  const {
    title,
    // subtitle,
    location,
    category,
    type,
    description,
    language,
    images,
   
    slug

  } = req.body;

console.log(req.body)


  if (!type || !title  || !language || !location || !category ||  !description || !images  || !slug ) {
    return false;
  }
  return true;
};

// Create a new news article
const createNews = async (req, res) => {
  if (!validateRequiredFields(req)) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const {
    title,
    subtitle,
    language,
    location,
    category,
    subcategory,
    type,
    description,
    images,
    youtubeurl,
    notificationSend,
    tag:_tag,
    slug
  } = req.body;
  
  const userId = req.user.id


  const authDetails = await User.findById(userId)

  const tag = JSON.parse(_tag);

 
  if (!Array.isArray(tag) || !tag.length) {
    return res.status(400).json({ error: 'Tags must be a non-empty array' });
  }


  // Parse images array from JSON string to JavaScript object
  const imagesArray = JSON.parse(images);

  try {
    // Validate category ID
    const isValidCategory = await validateCategory(category);
    if (!isValidCategory) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    if(subcategory){
      const isValidSubCategory = await validateSubCategory(subcategory);
      if (!isValidSubCategory) {
        return res.status(400).json({ success: false, message: 'Invalid subcategory ID' });
      }
    }
    // Validate subcategory ID
  

    let active = true
    if(authDetails.role === "Admin"){
      console.log("hello"
      )
      active = false
    }
    const newNews = new News({
      title,
      subtitle,
      location,
      category,
    subcategory: subcategory || null,
      language,
      type,
      active:active,
      tag,
      slug,
      author:authDetails._id,
      // expire: new Date(expire), // Convert expire to Date format
      description,
      images: imagesArray, // Assign parsed images array
      youtubeurl: youtubeurl || null, // Set youtubeurl to null if not provided
    });

    await newNews.save();

    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          news: newNews._id,
        },
      },
      { new: true }
    )

    if(subcategory){
      const categoryDetails3 = await SubCategory.findByIdAndUpdate(
        { _id: subcategory },
        {
          $push: {
            news: newNews._id,
          },
        },
        { new: true }
      )
    }
  


    if (notificationSend) {
      const notification = new Notification({ news: newNews._id });
      await notification.save();
    }


    res.status(201).json({ success: true, message: 'News article created successfully', news: newNews });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update news article by ID
const updateNewsById = async (req, res) => {
  const newsId = req.body.id;

  console.log("helllo")

  if (!validateRequiredFields(req)) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const {
    title,
    subtitle,
    location,
    category,
    subcategory,
    // expire,
    tag: _tag,
    slug,
    type,
    description,
    images,
    youtubeurl
  } = req.body;

  // Parse images array from JSON string to JavaScript object
  const imagesArray = JSON.parse(images);
  const tag = JSON.parse(_tag)
  console.log("tag", tag)

  try {
    // Validate category ID
    const isValidCategory = await validateCategory(category);
    if (!isValidCategory) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    // Validate subcategory ID
    const isValidSubCategory = await validateSubCategory(subcategory);
    if (!isValidSubCategory) {
      return res.status(400).json({ success: false, message: 'Invalid subcategory ID' });
    }

    const updatedFields = {
      title,
      subtitle,
      location,
      category,
      subcategory,
      tag,
      slug,
      // expire: new Date(expire), // Convert expire to Date format
      description,
      type,
      images: imagesArray, // Assign parsed images array
      youtubeurl: youtubeurl || null, // Set youtubeurl to null if not provided
    };

    const updatedNews = await News.findByIdAndUpdate(newsId, updatedFields, { new: true });

    if (!updatedNews) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }

    res.json({ success: true, message: 'News article updated successfully', news: updatedNews });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};



const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate('category', 'name') // Populate category with categoryName field
      .populate('subcategory', 'name')
      .populate("comments.author") // Populate subcategory with subcategoryName field
      .exec();

    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to delete a news article by ID
const deleteNewsById = async (req, res) => {
  const newsId = req.body.id;

  try {
    const deletedNews = await News.findByIdAndDelete(newsId);

    console.log(deletedNews)
    if (!deletedNews) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }


    // Remove news article ID from Category
    await Category.findByIdAndUpdate(
      { _id: deletedNews.category },
      {
        $pull: {
          news: deletedNews._id,
        },
      }
    );

    // Remove news article ID from SubCategory
    await SubCategory.findByIdAndUpdate(
      { _id: deletedNews.subcategory },
      {
        $pull: {
          news: deletedNews._id,
        },
      }
    );



    return res.status(200).json({ success: true, message: 'News article deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNewsById = async (req, res) => {
  const newsId = req.params.newsId;



  try {
    const news = await News.findOne({slug:newsId})
      .populate({
        path: 'subcategory',
        populate: { path: 'news' } // Populate subcategory and include all news
      })
      .populate({
        path: 'category',
        populate: { path: 'news' } // Populate subcategories and include all news

      }).populate("comments.author")
      .populate("author")
      .exec();

    if (!news) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }

    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleActive = async (req, res) => {
  const { newsId, activeStatus } = req.body;


  try {
    const news = await News.findByIdAndUpdate(newsId, { active: activeStatus }, { new: true });
    if (!news) {
      return res.status(404).json({ success: false, message: 'news not found' });
    }
    res.json({ success: true, message: 'news activated successfully', news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate('news') // Ensure 'news' is correctly referenced and populated
      .exec();

    res.json({
      success: true,
      notifications
    });
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
};











// Like a community post
const likePost = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id; // Assuming req.user contains the authenticated user's information

    // Find the post by ID
    const post = await News.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    // Increment the likes and add the user to the likedBy array
    post.likes += 1;
    post.likedBy.push(userId);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Comment on a community post
const removelikePost = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id; // Assuming req.user contains the authenticated user's information

    // Find the post by ID
    const post = await News.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has liked the post
    const likeIndex = post.likedBy.indexOf(userId);
    if (likeIndex === -1) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    // Decrement the likes and remove the user from the likedBy array
    post.likes -= 1;
    post.likedBy.splice(likeIndex, 1); // Remove the user from the likedBy array
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const commentOnPost = async (req, res) => {
  try {

    const { content, id } = req.body;
    const author = req.user.id;
    const post = await News.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comments.push({ author, content });
    await post.save();


    const news = await News.findById(id)
      .populate({
        path: 'subcategory',
        populate: { path: 'news' } // Populate subcategory and include all news
      })
      .populate({
        path: 'category',
        populate: { path: 'news' } // Populate subcategories and include all news

      }).populate("comments.author")
      .exec();


    res.status(201).json({
      post,
      news,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      success: false
      ,
      message: error.message
    });
  }
};




module.exports = {
  createNews,
  updateNewsById,
  toggleActive,
  getAllNews,
  deleteNewsById,
  getNewsById,
  getAllNotifications,

  likePost,
  removelikePost,
  commentOnPost
};
