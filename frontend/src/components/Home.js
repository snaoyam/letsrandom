import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Home.css";
import CatElement from "./CatElement";

const Home = ({setCate, catlistshow, reported, setReport}) => {
  const [inputs, setInputs] = useState('');

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
    console.log(v)
    axios.post(`/api/delete`,{
      id: v._id
    })
    .then(() => axios.get(`/api/`))
    .then(response => {
      const tempreported = reported;
      tempreported.push(v);
      setReport(tempreported);
      setCate(response.data);
      alert("삭제요청이 완료되었습니다.")
    });
  }
  const catElements = catlistshow.map((v, index) =>
    <React.Fragment key={index}>
      <CatElement element={v} deleteitem={deleteitem}/>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className="catep">
        {catElements}
      </div>
      <label>Add new items </label>
      <input type="text" id="newitem" required onChange={onChange} value={inputs}></input><button type="button" className="btn" onClick={additem}>추가하기</button>
    </React.Fragment>
  );
}

export default Home;