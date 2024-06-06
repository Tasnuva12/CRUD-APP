const Company =require('../models/company.model');

const getAllCompany = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleCompany = async (req, res) => {
  try {
    const { id } = await req.params;
    const company = await Company.findById(id);
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = await req.params;
    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!company) {
      res.status(400).json({ message: "Company doesn't exist!" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      res.status(400).json({ message: "Company doesn't exist!" });
    }
    res.status(200).json({ message: "Company is deleted successfully ! " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllCompany,
  getSingleCompany,
  updateCompany,
  createCompany,
  deleteCompany,
};