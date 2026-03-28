import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getLostItemById } from "../../Services/LostItemService";
import { getFoundItemsByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";

const MatchItemSearch = () => {

  const navigate = useNavigate();
  const param = useParams();

  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);

  const [lostItem, setLostItem] = useState({
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    username: ""
  });

  const [foundItemDTOList, setFoundItemDTOList] = useState([]);

  // ✅ Load Data (FIXED async)
  const showFoundItems = async () => {
    try {
      setLoading(true);

      const lostRes = await getLostItemById(param.pid);
      setLostItem(lostRes.data);

      const foundRes = await getFoundItemsByLostItem(param.pid);
      setFoundItemDTOList(foundRes.data);

    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showFoundItems();
  }, [param.pid]);

  // ✅ Claim Item
  const claimItem = (foundItemId, username) => {

    const matchItemData = {
      lostItemId: param.pid,
      foundItemId: foundItemId,
      itemName: lostItem.lostItemName, // ✅ FIXED
      category: lostItem.category,
      lostUsername: lostItem.username,
      foundUsername: username
    };

    saveMatchItem(matchItemData)
      .then(() => {
        setFlag(true);
        showFoundItems(); // 🔥 refresh UI
      })
      .catch(err => console.error(err));
  };

  const returnBack = () => {
    navigate("/lostitems");
  };

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">🔍 Matched Found Items</h2>

      {/* Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Table */}
      {!loading && (
        <table className="table table-bordered table-hover shadow">

          <thead className="table-dark">
            <tr>
              <th>Found Item Id</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Location</th>
              <th>Found Date</th>
              <th>Username</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {foundItemDTOList.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">
                  ❌ No Matches Found
                </td>
              </tr>
            ) : (

              foundItemDTOList.map((item) => (

                <tr key={item.foundItemId}>

                  <td>{item.foundItemId}</td>
                  <td>{item.foundItemName}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>{item.brand}</td>
                  <td>{item.location}</td>
                  <td>{item.foundDate}</td>
                  <td>{item.username}</td>

                  <td>
                    {item.status ? (
                      <span className="badge bg-success">Returned</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Not Returned</span>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={item.status}
                      onClick={() => claimItem(item.foundItemId, item.username)}
                    >
                      Claim
                    </button>
                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>
      )}

      {/* Success Message */}
      {flag && (
        <p className="text-center text-success fw-bold">
          ✅ Item Claimed Successfully
        </p>
      )}

      <div className="text-center mt-3">
        <button
          onClick={returnBack}
          className="btn btn-secondary"
        >
          ⬅ Back
        </button>
      </div>

    </div>
  );
};

export default MatchItemSearch;