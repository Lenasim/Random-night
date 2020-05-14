import React from 'react';
import logo from '../../images/logo-RN.svg'

import './Header.css'

const Header = ({ reset, scale, notice, header }) => {
  return (
    <div className={header}>
      <img onClick={reset} src={logo} alt="random night" className={scale} />
      <div className={notice}>
        <h1>Wanna chill on your couch tonight?</h1>
        <h4>We suggest you what to drink, watch and eat!</h4>
      </div>
    </div>
  );
};

export default Header;