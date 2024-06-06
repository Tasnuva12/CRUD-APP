const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    company: {
      type: String,
     
    },

    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    number: {
      type: String,
    },
    gender: { type: String },
    password: { type: String },
    role: { type: String },
    status: { type: String },
    email: { type: String, unique: true }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
