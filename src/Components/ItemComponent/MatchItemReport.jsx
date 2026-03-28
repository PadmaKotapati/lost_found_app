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
    <div className="container">
      <h2 className="text-center">Match Item Report</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Lost Item ID</th>
            <th>Found Item ID</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Lost User</th>
            <th>Found User</th>
          </tr>
        </thead>

        <tbody>
          {matches.length > 0 ? (
            matches.map((item, index) => (
              <tr key={index}>
                <td>{item.lostItemId}</td>
                <td>{item.foundItemId}</td>
                <td>{item.itemName}</td>
                <td>{item.category}</td>
                <td>{item.lostUsername}</td>
                <td>{item.foundUsername}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Matches Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatchItemReport;