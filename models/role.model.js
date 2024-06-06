const mongoose = require("mongoose");
const roleSchema = mongoose.Schema(
  {
    company: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);



const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
