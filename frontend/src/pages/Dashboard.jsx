import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);

  // check login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // fetch projects
  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProjects(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    navigate("/");

  };

  // create project
  const createProject = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/projects/create",
        {
          name,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Project created");

      setName("");
      setDescription("");

      fetchProjects();

    } catch (error) {

      console.log(error);
      alert("Error creating project");

    }

  };

  // delete project
  const deleteProject = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Project deleted");

      fetchProjects();

    } catch (error) {

      console.log(error);
      alert("Error deleting project");

    }

  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Dashboard</h2>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      {/* Stats cards */}

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={{
          padding: "20px",
          background: "#f4f4f4",
          borderRadius: "8px",
          width: "150px"
        }}>
          <h3>{projects.length}</h3>
          <p>Total Projects</p>
        </div>

        <div style={{
          padding: "20px",
          background: "#f4f4f4",
          borderRadius: "8px",
          width: "150px"
        }}>
          <h3>0</h3>
          <p>Total Tasks</p>
        </div>

        <div style={{
          padding: "20px",
          background: "#f4f4f4",
          borderRadius: "8px",
          width: "150px"
        }}>
          <h3>1</h3>
          <p>Team Members</p>
        </div>

      </div>

      {/* Create project */}

      <h3 style={{ marginTop: "40px" }}>Create Project</h3>

      <form onSubmit={createProject}>

        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Create Project
        </button>

      </form>

      {/* Project list */}

      <h3 style={{ marginTop: "40px" }}>Your Projects</h3>

      {projects.map((project) => (

        <div
          key={project._id}
          style={{
            background: "#eee",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "6px"
          }}
        >

          <h4>{project.name}</h4>
          <p>{project.description}</p>

          <button
            onClick={() => deleteProject(project._id)}
            style={{
              marginTop: "5px",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default Dashboard;