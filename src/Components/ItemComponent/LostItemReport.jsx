import React, { useState, useEffect } from "react";
import { getAllLostItems, getLostItemsByUsername, getRole } from "../../Services/LostItemService";

const LostItemReport = () => {

  const [items, setItems] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    getRole().then(res => {
      setRole(res.data);

      if (res.data === "Admin") {
        getAllLostItems().then(r => setItems(r.data));
      } else {
        getLostItemsByUsername().then(r => setItems(r.data));
      }
    });
  }, []);

  const claimItem = (id) => {
    alert("✅ Claimed Successfully for Item: " + id);
  };

  return (
    <div style={styles.page}>

      {/* DARK OVERLAY */}
      <div style={styles.overlay}></div>

      {/* MAIN CARD */}
      <div style={styles.card}>

        <h2 style={styles.title}>
          {role === "Admin" ? "Admin Dashboard" : "My Lost Items"}
        </h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map(item => (
              <tr key={item.lostItemId} style={styles.row}>
                <td>{item.lostItemId}</td>
                <td>{item.lostItemName}</td>
                <td>{item.category}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>

                <td>
                  <span style={{
                    ...styles.status,
                    background: item.status ? "#28a745" : "#dc3545"
                  }}>
                    {item.status ? "Found" : "Not Found"}
                  </span>
                </td>

                <td>
                  <button style={styles.searchBtn}>Search</button>
                  <button
                    style={styles.claimBtn}
                    onClick={() => claimItem(item.lostItemId)}
                  >
                    Claim
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

const styles = {

  page: {
    height: "100vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)"
  },

  card: {
    position: "relative",
    width: "90%",
    maxWidth: "1100px",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    zIndex: 2
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  row: {
    borderBottom: "1px solid #ddd"
  },

  status: {
    padding: "5px 10px",
    color: "white",
    borderRadius: "6px",
    fontSize: "12px"
  },

  searchBtn: {
    background: "#ffc107",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  claimBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default LostItemReport;