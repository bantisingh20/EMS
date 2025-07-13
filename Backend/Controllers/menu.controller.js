const Menu = require('../models/menu.model'); // Import Menu Model

// Save new menu
exports.SaveMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body); // Assuming body contains menu data
    await menu.save();
    res.status(201).json({ success: true, message: 'Menu saved successfully', menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all menus
exports.GetAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get menu by ID
exports.GetMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update menu by ID
exports.UpdateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    res.status(200).json({ success: true, message: 'Menu updated successfully', menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete menu by ID
exports.DeleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    res.status(200).json({ success: true, message: 'Menu deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
