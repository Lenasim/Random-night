import React from 'react';

import './Header.css'

import logo from '../images/logo-RN.svg'

const Header = ({reset}) => {
  return (
    <div>
      <img onClick={reset} src={logo} alt="random night" className="brand" />
    </div>
  );
};

export default Header;