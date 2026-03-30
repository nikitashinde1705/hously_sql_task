const { Department } = require("../models");

//Create Department
exports.createDepartment = async (req, res) => {
  try {

    //1: Get data from request body
    const { name } = req.body;
    //2:Create department in DB
    const department = await Department.create({ name });
    //3:Return created department
    res.status(201).json(department);
  } 
  catch (error) {
    //4:Handle errors
    res.status(500).json({ message: error.message });
  }
};

//Get All Departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Department (added)
exports.updateDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    await Department.update(
      { name },
      { where: { id: req.params.id } }
    );

    const updatedDepartment = await Department.findByPk(req.params.id);

    res.json(updatedDepartment);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Department (added)
exports.deleteDepartment = async (req, res) => {
  try {
    await Department.destroy({
      where: { id: req.params.id },
    });

    res.json({ message: "Department deleted" });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};