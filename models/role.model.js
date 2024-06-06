const mongoose = require("mongoose");
const companySchema = mongoose.Schema(
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

// Define a compound unique index on the company and name fields
companySchema.index({ company: 1, name: 1 }, { unique: true });

const Role = mongoose.model("Role", companySchema);
module.exports = Role;
