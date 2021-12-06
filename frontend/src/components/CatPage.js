import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./CatPage.css";
import CatPageResult from "./CatPageResult";

const CatPage = (props) => {
  const [item, setItems] = useState([{name: ""}]);
  const [inputs, setInputs] = useState('');

  useEffect(()=>{
    axios.put(`/api`, {
      id: props.path
    })
}, [])

  const onChange = (e) => {
    const {value} = e.target;
    setInputs(value);
  };

  const additem = () => {
    if(inputs) {
      axios.post(`/api/`+props.path, {
        newitem: inputs
      })
      .then(response => {
        setInputs('');
      });
    }
  };

  const reportitem = (v) => {
    hideResult(v);
    axios.post(`/api/`+props.path+`/delete/`, {
      id: item._id
    })
    .then(response => {
      setItems([{name: ""}]);
    });
  }

  const getranditem = (e) => {
    axios.get(`/api/`+props.path)
    .then(response => {
      if(response.data.name) {
        setItems(response.data);
        showResult(e);
      }
      else {
        alert("Please Add any items");
      }
    });
  };

  const [show, setShow] = useState("hideresult");
  const showResult = e => {
    e.preventDefault();
    setShow("showresult");
  };

  const hideResult = e => {
    e.preventDefault();
    setShow("hideresult");
  };

  return (
    <div className="catpage">
      <br></br>
      <span className="catename">
        {props.name}
      </span>
      <br></br>
      <div className="pickrandom" onClick={getranditem}>
        <img className="pick3" src="pick3.png"/>
        <img className="pick2" src="pick2.png"/>
        <img className="pick1" src="pick1.png"/>
      </div>
      <div className={show}>
        <CatPageResult result={item} hideResult={hideResult} reportitem={reportitem}/>
      </div>
      <br></br>
      <br></br>
      <label>Add new items </label>
      <input type="text" id="newitem" required onChange={onChange} value={inputs}></input><button type="button" className="btn" onClick={additem}>추가하기</button>
    </div>
  );
}

export default CatPage;