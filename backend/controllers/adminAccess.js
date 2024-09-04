const User = require('../models/authModel');
const bcrypt = require('bcrypt');

// Create a new admin
const addAdmin = async (req, res) => {
  const { name, email, password, permissions,location="admin" } = req.body;

  console.log(permissions)
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'Admin',
      permissions,
      location
    });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating admin' });
  }
};

// Update an admin's permissions
const updateAdminPermissions = async (req, res) => {
  const { adminId } = req.params;
  const { permissions } = req.body;
console.log(permissions)
  try {
    await User.findByIdAndUpdate(adminId, { permissions });
    res.status(200).json({ message: 'Permissions updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating permissions' });
  }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    await User.findByIdAndDelete(adminId);
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin' });
  }
};

const allAdmin = async (req, res) => {
  // console.log("hello")
  try {
    const admins = await User.find({ role: { $in: ['Admin'] } });
    // console.log(admins)
    res.json(admins);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  addAdmin,
  updateAdminPermissions,
  deleteAdmin,
  allAdmin
};
