import React, { Fragment, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import SocketContext from './socket-context';
import axios from 'axios';

import './../App.css';

const Item = ({ item, deleteItem, socket, getAllItems }) => {

  const [editable, setEditable] = useState(false);
  const [todo, setTodo] = useState(item.description);

  const toggleCompleted = () => {
    axios.post('/complete', {
      id: item.id,
      completed: !item.completed,
      description: item.description
    })
    .then(res => {
      if (res.data === 'changed') {
        socket.emit('sendItem');
        getAllItems();
      } 
    })
    .catch(err => {
      console.log(err)
    })
  }

  const editItem = () => {
    let changedState = !editable;
    setEditable(changedState);
    setTodo(item.description);
  }

  const handleChange = e => {
    setTodo(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/update', {
      description: todo,
      completed: item.completed,
      id: item.id
    }).then(res => {
      if (res.data === 'changed') {
        socket.emit('sendItem');
        getAllItems();
      }
    })
    let changedState = !editable;
    setEditable(changedState);
  }

  return (
    <div className="shopping-item-container">
      {!editable ?
        <Fragment>  
          <p onClick={() => toggleCompleted()} className={`shopping-item ${item.completed ? 'item-completed' : ''}`}>{item.description}</p>
          <button className="general-btn edit-btn" onClick={() => editItem()}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={() => deleteItem(item)} className="general-btn delete-btn"><span>&times;</span></button>
        </Fragment>
      :
        <Fragment>
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Control name="todo" type="text" value={todo} placeholder="Enter new item..." onChange={e => handleChange(e)}>
            </Form.Control>
          </Form>
        </Fragment>
      }
    </div>
  )
}

const ItemWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Item {...props} socket={socket} />}
  </SocketContext.Consumer>
)
  
export default ItemWithSocket;