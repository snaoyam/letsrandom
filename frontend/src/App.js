import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Topbar from "./components/Topbar";
import CatElement from "./components/CatElement";
import CatPage from "./components/CatPage";

function App() {
  const [items, setItems] = useState([]);

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

  const catElements = items.map((v) => 
  <Link to={v._id}>
    <CatElement name={v.category} onCatclick={() => clickcategory(v)}/>
  </Link>
  );

  const catPage = items.map((v) => 
  <Route exact path={"/"+v._id} element={<CatElement name={v.category}/>} key={v._id}/>
  );

console.log(catElements);
  return (
    <BrowserRouter>
      <Topbar /> 
      <Routes>
        <Route exact path="/" element={catElements}/>
        {catPage}
      </Routes>
    </BrowserRouter>
  )
}

export default App;