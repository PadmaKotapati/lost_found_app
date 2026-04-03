import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../Services/LoginService";
import {
  getAllFoundItems,
  getFoundItemsByUsername,
} from "../../Services/FoundItemService";

const FoundItemReport = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole().then((res) => {
      setRole(res.data);

      if (res.data === "Admin") {
        getAllFoundItems().then((r) => setItems(r.data));
      } else {
        getFoundItemsByUsername().then((r) => setItems(r.data));
      }
    });
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Found Item Report</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Date</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((i) => (
              <tr key={i.foundItemId}>
                <td>{i.foundItemId}</td>
                <td>{i.foundItemName}</td>
                <td>{i.category}</td>
                <td>{i.color}</td>
                <td>{i.brand}</td>
                <td>{i.location}</td>
                <td>{i.foundDate}</td>
                <td>{i.username}</td>
                <td style={{ color: i.status ? "green" : "red" }}>
                  {i.status ? "Matched" : "Not Matched"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button style={styles.btn} onClick={() => navigate("/student-menu")}>
          Back
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "40px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  btn: {
    marginTop: "20px",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};

export default FoundItemReport;