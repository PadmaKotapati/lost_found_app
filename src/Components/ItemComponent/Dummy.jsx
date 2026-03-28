import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Dummy = () => {

  const navigate = useNavigate();
  const { id } = useParams();   // must match :id in route

  useEffect(() => {

    if (id === '1') {
      navigate('/lost-entry');
    } 
    else if (id === '2') {
      navigate('/found-registration');
    }

  }, [id, navigate]);

  return null;   
};

export default Dummy;