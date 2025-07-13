const MenuRights = require('../models/menuRights.model');  // Import MenuRights Model

// Save new menu rights
exports.SaveMenuRights = async (req, res) => {
  try {
    const { menuId, viewRight, editRight, addRight, deleteRight } = req.body;

    const menuRights = new MenuRights({
      menuId,
      viewRight,
      editRight,
      addRight,
      deleteRight
    });

    await menuRights.save();
    res.status(201).json({ success: true, message: 'Menu rights saved successfully', menuRights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all menu rights
exports.GetAllMenuRights = async (req, res) => {
  try {
    const menuRights = await MenuRights.find();
    res.status(200).json({ success: true, data: menuRights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get menu rights by menu ID
exports.GetMenuRightsByMenuId = async (req, res) => {
  try {
    const menuRights = await MenuRights.find({ menuId: req.params.menuId });
    if (!menuRights || menuRights.length === 0) {
      return res.status(404).json({ success: false, message: 'Menu rights not found for this menu' });
    }
    res.status(200).json({ success: true, data: menuRights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update menu rights by ID
exports.UpdateMenuRights = async (req, res) => {
  try {
    const menuRights = await MenuRights.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuRights) {
      return res.status(404).json({ success: false, message: 'Menu rights not found' });
    }
    res.status(200).json({ success: true, message: 'Menu rights updated successfully', menuRights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete menu rights by ID
exports.DeleteMenuRights = async (req, res) => {
  try {
    const menuRights = await MenuRights.findByIdAndDelete(req.params.id);
    if (!menuRights) {
      return res.status(404).json({ success: false, message: 'Menu rights not found' });
    }
    res.status(200).json({ success: true, message: 'Menu rights deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
