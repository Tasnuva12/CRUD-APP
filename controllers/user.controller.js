const User = require("../models/user.model");
const Company = require("../models/company.model");
const Role=require("../models/role.model");

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const { company,role, ...userData } = req.body;

    // Check if the company exists by its name
    const companyExists = await Company.findOne({ name: company });
    const roleExists=await Role.findOne({company:company,name:role})

    if (!companyExists) {
      return res.status(400).json({
        message: "You can't create a user because Company doesn't exist!",
      });
    }
    if(!roleExists){
      return res.status(400).json({message:"You can't create a user because this role doesn't exist under this company. "})
    }

    // Assign the company's name to the user's company field
    userData.company = companyExists.name;

    // Create the user with the provided data
    const user = await User.create(userData);

    res.status(200).json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { company ,role} = req.body;

    if (company) {
      // Directly search for the company name without case-insensitivity
      const companyExists = await Company.findOne({ name: company });
      const roleExists=await Role.findOne({company:company,name :role});
      if (!companyExists) {
        return res.status(400).json({
          message:
            "You can't update the user because the company doesn't exist.",
        });
      }
      if(!roleExists){
        return res.status(400).json({
          message:"You can't update the user because the role doesn't exist under this company"
        });
      }
      req.body.company = companyExists.name;
      req.body.role=roleExists.name;
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(400).json({ message: "User doesn't exist!" });
    }
    res.status(200).json({ message: "User is deleted successfully ! " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllUser,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
};
