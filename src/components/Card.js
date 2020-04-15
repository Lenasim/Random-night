import React from 'react';
import './Card.css'

export default function Card(props) {

    return (

        <div className="card-container">

            <a className="card-link" href="#">
                <div className="card">
                    <img className="card-image" src="https://www.thecocktaildb.com/images/media/drink/acuvjz1582482022.jpg" alt=""/>
                    <div className="card-details">
                        <h4 className="card-category">cocktail</h4>
                        <h3 className="card-title">Frisco Sour</h3>
                        <button className="card-button">See details</button>
                    </div>
                </div>
            </a>

            <a className="card-link" href="#">
                <div className="card">
                    <img className="card-image" src="https://www.themealdb.com/images/media/meals/xusqvw1511638311.jpg" alt=""/>
                    <div className="card-details">
                        <h4 className="card-category">food</h4>
                        <h3 className="card-title">Bubble & Squeak</h3>
                        <button className="card-button">See details</button>
                    </div>
                </div>
            </a>

            <a className="card-link" href="#">
                <div className="card">
                    <img className="card-image" src="https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg" alt=""/>
                    <div className="card-details">
                        <h4 className="card-category">Movie</h4>
                        <h3 className="card-title">Ad Astra</h3>
                        <button className="card-button">See details</button>
                    </div>
                </div>
            </a>

        </div>

    )

}