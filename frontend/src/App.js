import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Topbar from "./components/Topbar";
import CatElement from "./components/CatElement";
import CatPage from "./components/CatPage";
import Recommended from "./components/Recommended";

function App() {
  const [catlist, setCate] = useState([]);
  const [item, setItems] = useState([]);

  useEffect(() => {
    axios.get(`/api`)
    .then(response => {
      setCate(response.data);
    });
  }, []);

  const clickcategory = (item) => {
    axios.put(`/api`, {
      id: item._id
    })
  };

  const getrandom = (item) => {
    console.log(item);
    axios.get(`/api/`+item._id)
    .then(response => {
      setItems(response.data);
    });
  };

  const catElements = catlist.map((v) => 
  <Link to={v._id}>
    <CatElement name={v.category} onCatclick={() => clickcategory(v)}/>
  </Link>
  );

  const catPage = catlist.map((v) => 
  <Route exact path={"/"+v._id} element={<CatPage name={v.category} GetRand={() => getrandom(v)}/>} key={v._id}/>
  );

console.log(catElements);
  return (
    <BrowserRouter>
      <Topbar /> 
      <Recommended />
      <Routes>
        <Route exact path="/" element={catElements}/>
        {catPage}
      </Routes>
    </BrowserRouter>
  )
}

export default App;