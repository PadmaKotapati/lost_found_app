import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Services/LoginService";

const AdminMenu = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "linear-gradient(to bottom, #5f2c82, #49a09d)",
        color: "white",
        padding: "20px"
      }}>

        <h2>Campus Connect</h2>
        <hr style={{ color: "white" }} />

        <p 
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/student-menu")}
        >
          👩‍🎓 Student List
        </p>

        <p 
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/lost-item-report")}
        >
          📄 Lost Item Report
        </p>

        <p 
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/found-report")}
        >
          📦 Found Item Report
        </p>

       

    <p 
      style={{ cursor: "pointer" }}
     onClick={() => navigate("/match-report")}
    >
  📊 Match Report
</p>
        <p 
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/profile")}
        >
          👤 My Profile
        </p>
        <p 
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/chat")}
        >
        💬 Chat
       </p>
       
        <hr style={{ color: "white" }} />

        <p 
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          🚪 Logout
        </p>

      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", backgroundColor: "#f5f5f5" }}>

        <h1>Welcome Admin 👋</h1>

        <div style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <h3>Admin Dashboard</h3>
          <p>Manage students, lost & found items, and match reports easily from this dashboard.</p>
        </div>

      </div>

    </div>
  );
};

export default AdminMenu;