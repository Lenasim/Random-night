import React from 'react';
import Modal from './Modal'


class Card extends React.Component {
    state = {
        modal: false
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal})
    }

    render() {
        return (
            <div>
            <a className="card-link" href="\#" onClick={this.toggleModal} >
                <div className="card">
                    <div className="card-details">
                        <h4 className="card-category">{this.props.categorie}</h4>
                        <h3 className="card-title">{this.props.name}</h3>
                    </div>
                    <img className="card-image" src={this.props.image} alt={this.props.name} />
                </div>
            </a>
            <Modal show={this.state.modal} handleClose={this.toggleModal}/>
            </div>
        )
    }
}

export default Card
