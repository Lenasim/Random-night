import React from 'react';
import './Card.css'

export default function Card(props) {

    return (
        <div>
            <div className="card-container">
                <a className="card-link" href="#">
                    <div className="card">
                        <img className="card-image" src="https://www.thecocktaildb.com/images/media/drink/acuvjz1582482022.jpg" />
                        <div className="card-details">
                            <h4 className="card-category">cocktail</h4>
                            <h3 className="card-title">Frisco Sour</h3>
                            <button className="card-button">See details</button>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )

}