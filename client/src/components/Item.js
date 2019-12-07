import React, { Component, Fragment } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import SocketContext from './socket-context';
import axios from 'axios';

import './../App.css';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      todo: this.props.item.description
    }
  }

  render() {

    const { item } = this.props;
    const { editable, todo } = this.state;

    return (
      <div className="shopping-item-container">
        {!editable ?
          <Fragment>  
            <p onClick={() => this.toggleCompleted()} className={`shopping-item ${item.completed ? 'item-completed' : ''}`}>{item.description}</p>
            <button className="general-btn edit-btn" onClick={() => this.editItem()}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button onClick={() => this.props.deleteItem(item)} className="general-btn delete-btn"><span>&times;</span></button>
          </Fragment>
        :
          <Fragment>
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Control name="todo" type="text" value={todo} placeholder="Enter new item..." onChange={e => this.handleChange(e)}>
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
        this.props.socket.emit('sendItem');
        this.props.getAllItems();
      } 
    })
    .catch(err => {
      console.log(err)
    })
  }

  editItem() {
    let changedState = !this.state.editable;
    this.setState({ editable: changedState, todo: this.props.item.description })
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
        this.props.socket.emit('sendItem');
        this.props.getAllItems();
      }
    })
    let changedState = !this.state.editable;
    this.setState({ editable: changedState })
  }
}

const ItemWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Item {...props} socket={socket} />}
  </SocketContext.Consumer>
)
  
export default ItemWithSocket;