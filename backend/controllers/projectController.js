const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {

    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user.id
    });

    res.status(201).json({
      message: "Project created",
      project
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProject };