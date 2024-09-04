const express = require('express');
const router = express.Router();
const adminAccess = require('../controllers/adminAccess');


// Add a new admin
router.post('/add', adminAccess.addAdmin);
router.get('/', adminAccess.allAdmin);

// Update admin permissions
router.put('/update/:adminId',  adminAccess.updateAdminPermissions);

// Delete an admin
router.delete('/delete/:adminId',  adminAccess.deleteAdmin);

module.exports = router;
