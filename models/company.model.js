const mongoose = require("mongoose");
const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
     
      unique: true,
    },
    contactName: {
      type: String,
    },
   
    contactEmail: { type: String },
    address: { type: String },
    remarks: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
