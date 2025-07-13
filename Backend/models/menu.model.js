const mongoose = require("mongoose");

// Menu Schema
const MenuSchema = new mongoose.Schema(
  {
    menuName: {
      type: String,
      required: true,
    },
    navigateUrl: {
      type: String,
      required: true,
    },
    parentMenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    menuType: {
      type: String,
      enum: ["primary", "secondary", "tertiary"],
      required: true,
    }, // To specify the category of the menu (Primary, Secondary, etc.)
    children: [
      {
        label: {
          type: String,
          required: true,
        },
        navigateUrl: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["primary", "secondary", "tertiary"],
          required: true,
        },
        order: {
          type: Number,
          default: 0,
        },
        description: {
          type: String,
          default: "",
        },
        isActive: {
          type: Boolean,
          default: true,
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    dateUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// Create the Menu model
const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
