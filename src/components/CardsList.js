import React from 'react';
import Card from './Card'
import './Card.css'

class CardsList extends React.Component {

    render() {
        return (
            <div className="card-container">
                <Card />
                <Card />
                <Card />
            </div>
        )
    }
}