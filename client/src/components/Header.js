import React, { Fragment } from "react";
import logo from "../img/logo.svg";
import "./header.css";

const Header = () => {
  return (
    <Fragment>
      <header>
        <img src={logo} alt='Font Frog Logo' width='150' />
        <h1 className='logo'>Font Frog</h1>
        <div className='nav-right'>
          <p>Feedback</p>
          <p>Reviews</p>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
