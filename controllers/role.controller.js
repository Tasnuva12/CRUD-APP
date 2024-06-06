const Role = require("../models/role.model");
const Company = require("../models/company.model");

const getAllRole = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleRole = async (req, res) => {
  try {
    const { id } = await req.params;
    const role = await Role.findById(id);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createRole = async (req, res) => {
  try {
    const { company, ...roleData } = req.body;

    // Check if the company exists by its name
    const companyExists = await Company.findOne({ name: company });

    if (!companyExists) {
      return res.status(400).json({
        message: "You can't create a role because Company doesn't exist!",
      });
    }
    // Check if a role with the same name already exists for the company
    const existingRole = await Role.findOne({
      company: companyExists.name,
      name: roleData.name,
    });

    if (existingRole) {
      return res.status(400).json({
        message: "A role with this name already exists for this company!",
      });
    }

    // Assign the company's name to the user's company field
    roleData.company = companyExists.name;
    roleData.name=existingRole.name;

    // Create the user with the provided data
    const role = await Role.create(roleData);

    res.status(200).json(role);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, name, ...updateData } = req.body; // Exclude company and name from updateData

    // Check if the provided company exists
    if (company) {
      const companyExists = await Company.findOne({ name: company });
      if (!companyExists) {
        return res.status(400).json({
          message:
            "You can't update the role because the company doesn't exist.",
        });
      }
    }

    // Check if the role exists under the company
    if (name) {
      const roleExists = await Role.findOne({ company, name });
      if (roleExists) {
        return res.status(400).json({
          message: "The role already exists under this company.",
        });
      }
    }

    // Update the role and fetch the updated role
     const updatedRole = await Role.findByIdAndUpdate(
       id,
       { ...updateData, name ,company},
       { new: true }
     );
     if (!updatedRole) {
       return res.status(400).json({ message: "Role doesn't exist!" });
     }

    res.status(200).json(updatedRole); // Return the updated role in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      res.status(400).json({ message: "Role doesn't exist!" });
    }
    res.status(200).json({ message: "Role is deleted successfully ! " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllRole,
  getSingleRole,
  updateRole,
  createRole,
  deleteRole,
};
