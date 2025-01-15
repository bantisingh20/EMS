const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    menuName: { type: String, required: true },
    navigateUrl: { type: String, required: true }, 
    parentmenuid: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null },
    isActive: { type: Boolean, default: true }, 
    isDelete: { type: Boolean, default: false },
    icon: { type: String, default: null }, 
    description: { type: String, default: '' },
    order: { type: Number, default: 0 }, 
    
}, {
    timestamps: true,
});

// Create and export the model
const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
