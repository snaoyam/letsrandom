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

  const catElements = catlist.map((v) => 
  <Link to={v._id}>
    <CatElement name={v.category} onCatclick={() => clickcategory(v)}/>
  </Link>
  );

  const catPage = catlist.map((v) => 
  <Route exact path={"/"+v._id} key={v._id} element={<CatPage path={v._id} name={v.category} GetRand={() => randitem(v)}/>}/>
  );

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