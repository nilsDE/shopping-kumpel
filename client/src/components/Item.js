import React, { Component } from 'react';
import axios from 'axios';

import './../App.css';

export default class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false
    }
  }
  render() {

    const completed = this.props.item.completed;

    return (
      <div className="shopping-item-container">
        <p onClick={() => this.toggleCompleted()} className={`shopping-item ${completed ? 'item-completed' : ''}`}>{this.props.item.description}</p>
        <button onClick={() => this.props.deleteItem(this.props.item)} className="delete-btn"><span>&times;</span></button>
      </div>
    )
  }

  toggleCompleted() {
    axios.post('/complete', {
      id: this.props.item.id,
      completed: !this.props.item.completed,
      description: this.props.item.description
    })
    .then(res => {
      if (res.data === 'changed') {
        this.props.getAllItems();
      } 
    })
    .catch(err => {
      console.log(err)
    })
  }
}
