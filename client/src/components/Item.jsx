/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import UserContext from '../context/user/userContext';
import ListContext from '../context/list/listContext';
import '../App.css';

const Item = ({ item }) => {
    const userContext = useContext(UserContext);
    const listContext = useContext(ListContext);

    const { user } = userContext;
    const { updateItem, deleteItem } = listContext;

    const [editable, setEditable] = useState(false);
    const [todo, setTodo] = useState(item.description);

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
        updateItem(todo, item.completed, item.id, user.name);
        const changedState = !editable;
        setEditable(changedState);
    };

    return (
        <div className="shopping-item-container">
            {!editable ? (
                <>
                    <p
                        onClick={() =>
                            updateItem(
                                item.description,
                                !item.completed,
                                item.id,
                                user.name
                            )
                        }
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
                        <FontAwesomeIcon icon={faTimes} />
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

Item.propTypes = {
    item: PropTypes.object.isRequired,
    socket: PropTypes.any.isRequired
};

export default Item;
