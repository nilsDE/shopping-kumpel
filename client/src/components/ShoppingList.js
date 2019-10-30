import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Item from './Item';
import axios from 'axios';
import './../App.css';

export default class ShoppingList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      items: []
    }
  }

  componentDidMount() {
    this.getAllItems();
  }

  render() {
    return (
      !this.props.isLoggedIn ?
        <h2 className="mt-5">You are logged out</h2>
      :
      <div className="shopping-list">
        <p>Your Shopping List</p>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Control className="mb-4" name="newTodo" type="text" value={this.state.newTodo} placeholder="Enter new item..." onChange={e => this.handleChange(e)}>
          </Form.Control>
        </Form>

      {this.state.items.length > 0 ?
        this.state.items.sort((a, b) => (a.id > b.id) ? 1 : -1).map((item, id) =>
        <Item 
          key={id} 
          item={item} 
          getAllItems={() => this.getAllItems()}
          deleteItem={item => this.deleteItem(item)} />
      ) : null}
      </div>
    )
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/create', {
      description: this.state.newTodo,
      completed: false
    }).then(res => {
      if (res.data === 'created') {
        this.setState({ newTodo: '' });
        this.getAllItems();
      }
    })
  }

  getAllItems() {
    axios.get('/items').then(res => this.setState({ items: res.data }));
  }

  deleteItem(item) {
    axios.post('/delete', {
      id: item.id
    })
    .then(res => {
      if (res.data === 'deleted') {
        this.getAllItems();
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}
