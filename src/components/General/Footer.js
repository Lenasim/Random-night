import React from 'react';

import './Footer.css'

const Footer = () => {
    return (
        <div className='Footer'>
            <hr />
            <div className='credits'>
                <div className='intro'>Made by </div>
                <div className='group'>
					<div className='team-group'>
						<div className="team">
							<p> Mohamed Abidi</p>
							<div className='footer-social'>
								<a
									href="https://www.linkedin.com/in/mohamedabidi-paris/"
									target="_blank"
									rel="noopener noreferrer"
									className='footer-link'>
									<i className="fab fa-linkedin-in"></i>
								</a>
								<a
									href="https://github.com/mohamedabidi1105"
									target="_blank"
									rel="noopener noreferrer"
									className='footer-link'>
									<i className="fab fa-github"></i>
								</a>
							</div>
						</div>
						<div className="team">
							<p> Lola Donval</p>
							<div className='footer-social'>
								<a
									href="https://www.linkedin.com/in/lola-donval"
									target="_blank"
									rel="noopener noreferrer"
									className='footer-link'>
									<i className="fab fa-linkedin-in"></i>
								</a>
								<a
									href="https://github.com/Lola-D"
									target="_blank"
									rel="noopener noreferrer">
									<i className="fab fa-github"></i>
								</a>
							</div>
						</div>
					</div>
					<div className='team-group'>
						<div className="team">
							<p> Lena Hailin Sim</p>
							<div className='footer-social'>
								<a
									href="https://www.linkedin.com/in/lena-hailin-sim/"
									target="_blank"
									rel="noopener noreferrer"
									className='footer-link'>
									<i className="fab fa-linkedin-in"></i>
								</a>
								<a
									href="https://github.com/lenasim"
									target="_blank"
									rel="noopener noreferrer"
									className='footer-link'>
									<i className="fab fa-github"></i>
								</a>
							</div>
						</div>
						<div className="team">
							<p> Jérémie Néret</p>
							<div className='footer-social'>
								<a
									href="https://github.com/"
									target="_blank"
									rel="noopener noreferrer"
									className='footer-link'>
									<i className="fab fa-linkedin-in"></i>
								</a>
								<a
									href="https://github.com/jeremierenoir"
									target="_blank"
									rel="noopener noreferrer"
									className='footer-link'>
									<i className="fab fa-github"></i>
								</a>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
    );
};

export default Footer