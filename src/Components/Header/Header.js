import React from 'react';
import './header.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Header = (props) => {

  return (
    <div className="header">
      <span className="header-link"><Link to="/">Graph</Link></span>
      <span className="header-link"><Link to="/clipboard">ClipBoard Copy</Link></span>
      <span className="header-link"><Link to="/selfie">Selfie</Link></span>
    </div>

  )
}

export default Header;