import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./CatPage.css";

const Category = (props) => {
  return (
      <>
        <button onClick={props.GetRand}>Add</button>
      </>
  );
}

export default Category;