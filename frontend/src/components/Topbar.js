import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

const Topbar = () =>
<React.Fragment>
  <div className="topbar">
    <Link to="/">
      랜덤룰렛
    </Link>
  </div>
  <div className="blank"></div>
</React.Fragment>

export default Topbar;
