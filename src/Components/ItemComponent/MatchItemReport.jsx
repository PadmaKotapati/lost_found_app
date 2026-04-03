import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../Services/MatchItemService";

const MatchItemReport = () => {

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getAllMatches()
      .then((response) => {
        setMatches(response.data);
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
      });
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>🔍 Match Item Report</h2>

        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th>Lost ID</th>
              <th>Found ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Lost User</th>
              <th>Found User</th>
            </tr>
          </thead>

          <tbody>
            {matches.length > 0 ? (
              matches.map((item, index) => (
                <tr key={index} style={styles.row}>
                  <td>{item.lostItemId}</td>
                  <td>{item.foundItemId}</td>
                  <td>{item.itemName || "N/A"}</td>
                  <td>{item.category}</td>
                  <td>{item.lostUsername}</td>
                  <td>{item.foundUsername}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.noData}>
                  🚫 No Matches Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default MatchItemReport;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "90%",
    maxWidth: "1000px",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  headerRow: {
    background: "#4f46e5",
    color: "white"
  },
  row: {
    textAlign: "center",
    borderBottom: "1px solid #ddd"
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    color: "red",
    fontWeight: "bold"
  }
};