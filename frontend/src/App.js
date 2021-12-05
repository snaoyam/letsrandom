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
  const [inputs, setInputs] = useState('');
  useEffect(() => {
    axios.get(`/api`)
    .then(response => {
      setCate(response.data);
    });
  }, []);


  const onChange = (e) => {
    const {value} = e.target;
    setInputs(value);
  };

  const additem = () => {
    if(inputs) {
      axios.post(`/api/`,{
        newcat: inputs
      })
      .then(() => axios.get(`/api/`))
      .then(response => {
        setCate(response.data);
        setInputs('');
      });
    }
  };

  const deleteitem = (v) => {
    console.log(v);
  }

  const catElements = catlist.map((v, index) => <>
    <Link to={v._id} key={index}>
      <CatElement name={v.category}/>
    </Link>
  </>
  );
  
  const catElementsadd =
    <div key="add">
      <label>Add new items </label>
      <input type="text" id="newitem" required onChange={onChange} value={inputs}></input><button type="button" className="btn" onClick={additem}>추가하기</button>
    </div>;
  catElements.push(catElementsadd);

  const catPage = catlist.map((v, index) => 
  <Route exact path={"/"+v._id} key={v._id} element={<CatPage path={v._id} name={v.category}/>}/>
  );

  const Notfound = <> 404 Not found </>

  return (
    <BrowserRouter>
      <Topbar /> 
      <Recommended />
      <Routes>
        <Route exact path="/" element={catElements}/>
        {catPage}
        <Route path="*" element={Notfound}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;