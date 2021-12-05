import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Topbar from "./components/Topbar";
import CatPage from "./components/CatPage";
import Recommended from "./components/Recommended";
import Home from "./components/Home";

function App() {
  const [catlist, setCate] = useState([]);
  useEffect(() => {
    axios.get(`/api`)
    .then(response => {
      setCate(response.data);
    });
  }, []);

  const catPage = catlist.map((v, index) => <Route exact path={"/"+v._id} key={v._id} element={<CatPage path={v._id} name={v.category}/>}/>);
  const Notfound = <span> 404 Not found </span>

  return (
    <BrowserRouter>
      <Topbar /> 
      <Recommended />
      <Routes>
        <Route exact path="/" element={<Home catlist={catlist} setCate={setCate}/>}/>
        {catPage}
        <Route path="*" element={Notfound}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;