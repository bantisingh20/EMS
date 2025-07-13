const RoleWiseRights = require('../models/rolewiserights.model');  // Import RoleWiseRights Model

// Save new role-wise rights
exports.SaveRoleWiseRights = async (req, res) => {
  try {
    const { role, menuId, viewRight, editRight, addRight, deleteRight } = req.body;

    const roleWiseRights = new RoleWiseRights({
      role,
      menuId,
      viewRight,
      editRight,
      addRight,
      deleteRight
    });

    await roleWiseRights.save();
    res.status(201).json({ success: true, message: 'Role-wise rights saved successfully', roleWiseRights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all role-wise rights
exports.GetAllRoleWiseRights = async (req, res) => {
  try {
    const roleWiseRights = await RoleWiseRights.find().populate('menuId');
    res.status(200).json({ success: true, data: roleWiseRights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get role-wise rights by role
exports.GetRoleWiseRightsByRole = async (req, res) => {
  try {
    const roleWiseRights = await RoleWiseRights.find({ role: req.params.role }).populate('menuId');
    if (!roleWiseRights || roleWiseRights.length === 0) {
      return res.status(404).json({ success: false, message: 'Role-wise rights not found for this role' });
    }
    res.status(200).json({ success: true, data: roleWiseRights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update role-wise rights by ID
exports.UpdateRoleWiseRights = async (req, res) => {
  try {
    const roleWiseRights = await RoleWiseRights.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!roleWiseRights) {
      return res.status(404).json({ success: false, message: 'Role-wise rights not found' });
    }
    res.status(200).json({ success: true, message: 'Role-wise rights updated successfully', roleWiseRights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete role-wise rights by ID
exports.DeleteRoleWiseRights = async (req, res) => {
  try {
    const roleWiseRights = await RoleWiseRights.findByIdAndDelete(req.params.id);
    if (!roleWiseRights) {
      return res.status(404).json({ success: false, message: 'Role-wise rights not found' });
    }
    res.status(200).json({ success: true, message: 'Role-wise rights deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
