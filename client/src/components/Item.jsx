/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import SocketContext from './socket-context';
import UserContext from '../context/user/userContext';
import '../App.css';

const Item = ({ item, deleteItem, socket, getAllItems }) => {
    const userContext = useContext(UserContext);
    const { user } = userContext;

    const [editable, setEditable] = useState(false);
    const [todo, setTodo] = useState(item.description);

    const toggleCompleted = () => {
        axios
            .post('/complete', {
                id: item.id,
                completed: !item.completed,
                description: item.description,
                lastModified: user.name
            })
            .then(res => {
                if (res.data === 'changed') {
                    socket.emit('sendItem');
                    getAllItems();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const editItem = () => {
        const changedState = !editable;
        setEditable(changedState);
        setTodo(item.description);
    };

    const handleChange = e => {
        setTodo(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('/update', {
                description: todo,
                completed: item.completed,
                id: item.id,
                lastModified: user.name
            })
            .then(res => {
                if (res.data === 'changed') {
                    socket.emit('sendItem');
                    getAllItems();
                }
            });
        const changedState = !editable;
        setEditable(changedState);
    };

    return (
        <div className="shopping-item-container">
            {!editable ? (
                <>
                    <p
                        onClick={() => toggleCompleted()}
                        className={`shopping-item ${
                            item.completed ? 'item-completed' : ''
                        }`}
                    >
                        {item.description}
                        <span
                            className={`${
                                item.lastModified === user.name
                                    ? 'modified-self'
                                    : 'modified-other'
                            } ${item.completed ? 'item-completed' : ''}`}
                        >
                            {item.lastModified === user.name
                                ? '(me)'
                                : item.lastModified}
                        </span>
                    </p>
                    <button
                        className={`general-btn edit-btn ${
                            item.completed ? 'btn-disabled' : ''
                        }`}
                        onClick={() => editItem()}
                        type="button"
                        disabled={item.completed}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                        onClick={() => deleteItem(item)}
                        className="general-btn delete-btn"
                        type="button"
                    >
                        <span>&times;</span>
                    </button>
                </>
            ) : (
                <>
                    <Form onSubmit={e => handleSubmit(e)}>
                        <Form.Control
                            name="todo"
                            type="text"
                            value={todo}
                            placeholder="Enter new item..."
                            onChange={e => handleChange(e)}
                        ></Form.Control>
                    </Form>
                </>
            )}
        </div>
    );
};

const ItemWithSocket = props => (
    <SocketContext.Consumer>
        {socket => <Item {...props} socket={socket} />}
    </SocketContext.Consumer>
);

Item.propTypes = {
    deleteItem: PropTypes.func.isRequired,
    getAllItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    socket: PropTypes.any.isRequired
};

export default ItemWithSocket;
