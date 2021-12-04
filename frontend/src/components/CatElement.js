import React from "react";
import "./CatElement.css";

const CatItem = (props) => {
  return (
    <div className="cat-item" id={props.id} onClick={props.onCatclick}>
      <span>{props.name}</span>
    </div>
  );
};

export default CatItem;
