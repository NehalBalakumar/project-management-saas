function Dashboard() {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

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
    </div>
  )
}

export default Dashboard