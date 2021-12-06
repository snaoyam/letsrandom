import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Topbar from "./components/Topbar";
import CatPage from "./components/CatPage";
import Home from "./components/Home";

function App() {
  const [catlist, setCate] = useState([]);
  const [reported, setReport] = useState([]);
  const [catlistshow, setCateshow] = useState(catlist);

  useEffect(() => {
    const temprep = [];
    reported.forEach(v => { temprep.push(v._id) });
    const tempshow = catlist.filter(v => !temprep.includes(v._id));
    setCateshow(tempshow);

  }, [catlist]);

  useEffect(() => {
    axios.get(`/api`)
    .then(response => {
      setCate(response.data);
    });
  }, []);

  const catPage = catlistshow.map((v, index) => <Route exact path={"/"+v._id} key={v._id} element={<CatPage path={v._id} name={v.category}/>}/>);
  const Notfound = <span> 404 Not found </span>

  return (
    <BrowserRouter>
      <Topbar /> 
      <Routes>
        <Route exact path="/" element={<Home setCate={setCate} reported={reported} setReport={setReport} catlistshow={catlistshow}/>}/>
        {catPage}
        <Route path="*" element={Notfound}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;