const Project = require("../models/Project");


// CREATE PROJECT
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

    res.status(500).json({
      message: "Server error"
    });

  }

};


// GET PROJECTS
const getProjects = async (req, res) => {

  try {

    const projects = await Project.find({
      owner: req.user.id
    });

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


// DELETE PROJECT
const deleteProject = async (req, res) => {

  try {

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json({
      message: "Project deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


module.exports = {
  createProject,
  getProjects,
  deleteProject
};