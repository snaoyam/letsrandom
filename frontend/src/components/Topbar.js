import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

const Topbar = () =>
  <div className="topbar">
    <Link to="/">
      Home
    </Link>
  </div>

export default Topbar;
