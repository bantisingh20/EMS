const moongose = require("mongoose");

const moduleSchema = new moongose.Schema(
  {
    moduleName: { type: String, required: true },
    is_delete: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);


const ModuleTable = moongose.model("Module",moduleSchema);


module.exports = { ModuleTable };