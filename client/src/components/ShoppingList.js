import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Item from './Item';
import axios from 'axios';
import io from 'socket.io-client';
import SocketContext from './socket-context';
import './../App.css';

let socket;

const ShoppingList = ({ isLoggedIn }) => {

  useEffect(() => {
    getAllItems();
    socket = io();
    socket.on('change', () => {
      getAllItems();
    })
    // eslint-disable-next-line
  }, []);

  const [newTodo, setNewTodo] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/create', {
      description: newTodo,
      completed: false
    }).then(res => {
      if (res.data === 'created') {
        socket.emit('sendItem');
        setNewTodo('');
        getAllItems();
      }
    })
  };

  const getAllItems = () => {
    axios.get('/items').then(res => setItems(res.data));
  }

  const deleteItem = item => {
    axios.post('/delete', {
      id: item.id
    })
    .then(res => {
      if (res.data === 'deleted') {
        socket.emit('sendItem');
        getAllItems();
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    !isLoggedIn ?
      <h2 className="mt-5">You are logged out</h2>
    :
    <div className="shopping-list">
      <p className="shopping-list-title">Your Shopping List</p>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Control 
          className="mb-4" 
          name="newTodo" 
          type="text" 
          value={newTodo} 
          placeholder="Enter new item..." 
          onChange={e => setNewTodo(e.target.value)}>
        </Form.Control>
      </Form>

    {items.length > 0 ?
      items.sort((a, b) => (a.id > b.id) ? 1 : -1).map((item, id) =>
      <SocketContext.Provider key={id} value={socket}>
        <Item 
          key={id} 
          item={item} 
          getAllItems={() => getAllItems()}
          deleteItem={item => deleteItem(item)}
        />
        </SocketContext.Provider>
    ) : null}
    </div>
  )
}

export default ShoppingList;