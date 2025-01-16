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

const Menu = mongoose.model('Menu', MenuSchema);

const menurightMaster = new mongoose.Schema({
     
    menuid: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null },   
    usergroup: { type: String, default: null }, 
    
}, {
    timestamps: true,
});

// Create and export the model
const MenuRight = mongoose.model('MenuRight', menurightMaster);

module.exports = {Menu,MenuRight};
