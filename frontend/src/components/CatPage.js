import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CatPage.css";
import CatElement from "./CatElement";

const Category = () => {
  const [items, setItems] = useState([]);
  /*
  useEffect(() => {
    axios.get(`/api`)
    .then(response => {
      setItems(response.data);
    });
  }, []);

  const clickcategory = (item) => {
    axios.put(`/api`, {
      id: item._id
    })
  };

  const catElements = items.map(v => <>
    <Link to={v.category}>
      <CatElement name={v.category} onCatclick={() => clickcategory(v)}/>
    </Link>
    </>);
    */
  return (
    <div className="main">
      <div className="TopBanner"></div>
      <div className="list">
        {catElements}
      </div>
    </div>
  );
}

export default Category;