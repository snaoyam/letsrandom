import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./CatPage.css";

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

  const getranditem = () => {
    axios.get(`/api/`+props.path)
    .then(response => {
      if(response.data.name) {
        setItems(response.data);
      }
      else {
        alert("Please Add any items");
      }
    });
  };

  return (
    <>
      {props.name}<br></br>
      <button type="button" className="btn" onClick={getranditem}>Get Random!</button><br></br>
      <div>Random value: {item.name}</div>
      <label>Add new items </label>
      <input type="text" id="newitem" required onChange={onChange} value={inputs}></input><button type="button" className="btn" onClick={additem}>추가하기</button>
    </>
  );
}

export default CatPage;