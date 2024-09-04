// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    toggleActive,
    deleteCategory
} = require('../controllers/category');

// Categories routes
router.post('/create', createCategory); // Create a new category
router.delete('/delete/:id', deleteCategory); // Create a new category
router.get('/all', getAllCategories); // Get all categories with populated subCategories
router.get('/:id', getCategoryById); // Get a single category by ID with populated subCategories
router.put('/toggleActive', toggleActive); // Toggle active status of category

module.exports = router;
