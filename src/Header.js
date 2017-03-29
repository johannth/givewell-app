import React from 'react';
import classNames from 'classnames';

import logo from './gwlogo.png';
import './Header.css';

const Header = ({small}) => (
  <header className={classNames({Header: true, 'Header--small': small})}>
    <img className="Header__logo" src={logo} alt="GiveWell" />
  </header>
);

export default Header;
