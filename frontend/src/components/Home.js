import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import CatElement from "./CatElement";

const Home = ({catlist, setCate}) => {
  const [inputs, setInputs] = useState('');
  const [catlistshow, setCateshow] = useState(catlist);
  const [reported, setReport] = useState([]);

  useEffect(() => {
    const temprep = [];
    reported.forEach(v => { temprep.push(v._id) });
    const tempshow = catlist.filter(v => !temprep.includes(v._id));
    setCateshow(tempshow);

  }, [catlist]);

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
    <div key={index} id={v._id}>
      <Link to={v._id}>
        <CatElement name={v.category}/>
      </Link>
      <button type="button" className="btn" onClick={() => {
          deleteitem(v);
        }}>삭제요청</button>
    </div>
  );

  return (
    <React.Fragment>
      {catElements}
      <label>Add new items </label>
      <input type="text" id="newitem" required onChange={onChange} value={inputs}></input><button type="button" className="btn" onClick={additem}>추가하기</button>
    </React.Fragment>
  );
}

export default Home;