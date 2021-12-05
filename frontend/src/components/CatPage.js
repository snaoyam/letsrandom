import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./CatPage.css";

const CatPage = (props) => {
  const [item, setItems] = useState([{name: ""}]);
  const [inputs, setInputs] = useState('');

  const onChange = (e) => {
    const {value} = e.target;
    setInputs(value);
  };

  const additem = () => {
    if(inputs) {
      axios.post(`/api/`+props.path, null, { params: {
        newitem: inputs
      }})
      .then(response => {
        setInputs('');
        console.log(response);
      });
    }
  };

  const getranditem = () => {
    axios.get(`/api/`+props.path)
    .then(response => {
      setItems(response.data);
    });
  };

  return (
    <>
      <button type="button" className="btn" onClick={getranditem}>Get Random!</button><br></br>
      <div>Random value: {item[0].name}</div>
      <label>Add new items</label><br></br>
      <input type="text" id="newitem" required onChange={onChange} value={inputs}></input><button type="button" className="btn" onClick={additem}>추가하기</button>
    </>
  );
}

export default CatPage;