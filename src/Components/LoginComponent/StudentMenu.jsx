import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../Services/LoginService";
const StudentMenu=()=>{
    let navigate=useNavigate();
       const handleLogout = () => {
         logout().then(() => {
               localStorage.clear();
               sessionStorage.clear();
               navigate('/');
           })
        };
     return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#F8FAFC" }}>

      {/* Sidebar */}
      <div style={{
        width: "250px",
        backgroundColor: "#4F46E5",
        color: "white",
        padding: "20px"
      }}>
        <h3>Campus Connect</h3>
        <hr />

        <p style={{ cursor: "pointer" }} onClick={() => navigate("/lost-entry")}>
          ➤ Lost Item Entry
        </p>

        <p style={{ cursor: "pointer" }} onClick={() => navigate("/lost-item-report")}>
          ➤ Lost Item Report
        </p>

        <p style={{ cursor: "pointer" }} onClick={() => navigate("/found-registration")}>
          ➤ Found Item Entry
        </p>

        <p style={{ cursor: "pointer" }} onClick={() => navigate("/found-report")}>
          ➤ Found Item Report
        </p>
        <p 
         style={{ cursor: "pointer" }}
         onClick={() => navigate("/match-report")}
        >
  ➤ Match Report
</p>
        <p onClick={() => navigate("/Profile")}>
          👤 My Profile
        </p>
        <p 
         style={{ cursor: "pointer" }}
        onClick={() => navigate("/chat")}
        >
       💬 Chat
       </p>
       
        <hr />

        <p style={{ cursor: "pointer" }} onClick={handleLogout}>
          ➤ Logout
        </p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px" }}>
        <h2 style={{ color: "#1E293B" }}>Welcome Student 👋</h2>

        <div style={{
          marginTop: "30px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <h4>Lost & Found Dashboard</h4>
          <p>
            Manage your lost and found items easily from this dashboard.
          </p>
        </div>
      </div>

    </div>
  );
};

export default StudentMenu;