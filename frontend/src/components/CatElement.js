import React from "react";
import { Link } from "react-router-dom";
import "./CatElement.css";

const CatItem = ({element, deleteitem}) => {
  return (
    <React.Fragment>
      <Link to={element._id}>
        <div className="cat-item" id={element._id}>
          <span className="cat-name">{element.category}</span>
        </div>
      </Link>
      <div className="catpagebtn">
        <button type="button" className="btn" onClick={() => {
          deleteitem(element);
        }}>삭제요청</button>
      </div>
    </React.Fragment>
  );
};

export default CatItem;
