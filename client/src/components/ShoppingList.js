import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import './../App.css';

export default class ShoppingList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: []
    }
  }
  render() {
    return (
      <div className="shopping-list">
        <p>This is going to be the Shopping List</p>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Control name="newTodo" type="text" placeholder="Enter new item..." onChange={e => this.handleChange(e)}>

          </Form.Control>
        </Form>
      </div>
    )
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    
  }
}
