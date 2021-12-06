import React from "react";
import { Link } from "react-router-dom";
import "./CatElement.css";

const CatItem = ({element, deleteitem}) => {
  //onClick={() => {deleteitem(element);}
  return (
    <React.Fragment>
      <div className="catelement">
        <Link to={element._id}>
          <div className="cat-item" id={element._id}>
            <span className="cat-name">{element.category}</span>
          </div>
        </Link>
        <div className="catpagebtn" onClick={() => {deleteitem(element);}}>
          <span>삭제요청</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CatItem;
