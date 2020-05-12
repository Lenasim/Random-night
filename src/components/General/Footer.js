import React from 'react';
import './Footer.css'

const Footer = ({ classFooter }) => {
  return (
    <div className={classFooter}>
      <div className='credits'>
        <p>Made with <i className="fas fa-heart"></i> by </p>
        <div className='team-group'>
          <p className="team">Mohamed Abidi</p>
          <div className='footer-social'>
            <a href="https://www.linkedin.com/in/mohamedabidi-paris/" target="_blank" className='footer-link'><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/mohamedabidi1105" target="_blank" className='footer-link'><i className="fab fa-github-square"></i></a>
          </div>
          <p className="team">\  Lola Donval</p>
          <div className='footer-social'>
            <a href="https://www.linkedin.com/in/lola-donval" target="_blank" className='footer-link'><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/Lola-D" target="_blank"><i className="fab fa-github-square"></i></a>
          </div>
        </div>
        <div className='team-group'>
          <p className="team">\ Lena Hailin Sim</p>
          <div className='footer-social'>
            <a href="https://www.linkedin.com/in/lena-hailin-sim/" target="_blank" className='footer-link'><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/lenasim" target="_blank" className='footer-link'><i className="fab fa-github-square"></i></a>
          </div>
          <p className="team">\  Jérémie Néret</p>
          <div className='footer-social'>
            <a href="https://github.com/" target="_blank" className='footer-link'><i className="fab fa-linkedin"></i></a>
            <a href="https://github.com/jeremierenoir" target="_blank" className='footer-link'><i className="fab fa-github-square"></i></a>
          </div>
        </div>
      </div>
      <div className='mentions'>
        <p>L'abus d'alcool est dangereux pour la santé, consommez avec modération. Pour votre santé, mangez au moins cinq fruits et légumes par jour, pratiquez une activité physique régulière, évitez de grignoter entre les repas.</p>
      </div>
    </div>
  );
};

export default Footer;