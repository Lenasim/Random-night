import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div className="Footer">
      <p>Made with <i className="fas fa-heart"></i> by </p>
      <p className="mohamed">Mohamed Abidi</p>
      <div className='footer-social'>
        <a href="https://www.linkedin.com/in/mohamedabidi-paris/" target="_blank"><i className="fab fa-linkedin"></i></a>
        <a href="https://github.com/mohamedabidi1105" target="_blank"><i className="fab fa-github-square"></i></a>
      </div>
      <p className="lola">\  Lola Donval</p>
      <div className='footer-social'>
        <a href="https://www.linkedin.com/in/lola-donval" target="_blank"><i className="fab fa-linkedin"></i></a>
        <a href="https://github.com/Lola-D" target="_blank"><i className="fab fa-github-square"></i></a>
      </div>
      <p className="lena">\  Lena Hailin Sim</p>
      <div className='footer-social'>
        <a href="https://www.linkedin.com/in/lena-hailin-sim/" target="_blank"><i className="fab fa-linkedin"></i></a>
        <a href="https://github.com/lenasim" target="_blank"><i className="fab fa-github-square"></i></a>
      </div>
      <p className="jerem">\  Jérémie Néret</p>
      <div className='footer-social'>
        <a href="https://github.com/" target="_blank"><i className="fab fa-linkedin"></i></a>
        <a href="https://github.com/jeremierenoir" target="_blank"><i className="fab fa-github-square"></i></a>
      </div>
    </div>
  );
};

export default Footer;