import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // check login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

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

      alert("Project created!");

      setName("");
      setDescription("");

    } catch (error) {
      console.log(error);
      alert("Error creating project");
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

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={{
          padding: "20px",
          background: "#f4f4f4",
          borderRadius: "8px",
          width: "150px"
        }}>
          <h3>12</h3>
          <p>Total Projects</p>
        </div>

        <div style={{
          padding: "20px",
          background: "#f4f4f4",
          borderRadius: "8px",
          width: "150px"
        }}>
          <h3>35</h3>
          <p>Total Tasks</p>
        </div>

        <div style={{
          padding: "20px",
          background: "#f4f4f4",
          borderRadius: "8px",
          width: "150px"
        }}>
          <h3>5</h3>
          <p>Team Members</p>
        </div>

      </div>

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

    </div>
  );
}

export default Dashboard;