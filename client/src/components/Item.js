import React, { Component, Fragment } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import './../App.css';

export default class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      todo: this.props.item.description
    }
  }
  render() {

    const completed = this.props.item.completed;

    return (
      <div className="shopping-item-container">
        {!this.state.editable ?
          <Fragment>  
            <p onClick={() => this.toggleCompleted()} className={`shopping-item ${completed ? 'item-completed' : ''}`}>{this.props.item.description}</p>
            <button className="delete-btn" onClick={() => this.editItem()}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button onClick={() => this.props.deleteItem(this.props.item)} className="delete-btn"><span>&times;</span></button>
          </Fragment>
        :
          <Fragment>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Control name="todo" type="text" value={this.state.todo} placeholder="Enter new item..." onChange={e => this.handleChange(e)}>
              </Form.Control>
            </Form>
          </Fragment>
        }
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

  editItem() {
    let changedState = !this.state.editable;
    this.setState({ editable: changedState })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/update', {
      description: this.state.todo,
      completed: this.props.item.completed,
      id: this.props.item.id
    }).then(res => {
      if (res.data === 'changed') {
        this.props.getAllItems();
      }
    })
    let changedState = !this.state.editable;
    this.setState({ editable: changedState })
  }
}
