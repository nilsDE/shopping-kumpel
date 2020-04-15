/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth/authContext';
import ListContext from '../../../context/list/listContext';
import '../../../App.css';

const Item = ({ item, list }) => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);

    const { user } = authContext;
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
        updateItem(todo, item.completed, item.id, user.name, list);
        const changedState = !editable;
        setEditable(changedState);
    };

    return (
        <div className="shopping-item-container">
            {!editable ? (
                <>
                    <div
                        className="text-left item-wrapper"
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                            updateItem(item.description, !item.completed, item.id, user.name, list)
                        }
                    >
                        <p
                            onClick={() =>
                                updateItem(item.description, !item.completed, item.id, user.name, list)
                            }
                            className={`shopping-item ${item.completed ? 'item-completed' : ''}`}
                        >
                            {item.description}
                            <span
                                className={`${
                                    item.lastModified === user.name ? 'modified-self' : 'modified-other'
                                } ${item.completed ? 'item-completed' : ''}`}
                            >
                                {item.lastModified === user.name ? '(me)' : item.lastModified}
                            </span>
                        </p>
                    </div>
                    <button
                        className={`general-btn ${item.completed ? 'btn-disabled' : ''}`}
                        onClick={() => editItem()}
                        type="button"
                        disabled={item.completed}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                        onClick={() => deleteItem(item, list)}
                        className="general-btn delete-btn"
                        type="button"
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
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
                        />
                    </Form>
                </>
            )}
        </div>
    );
};

Item.propTypes = {
    item: PropTypes.object.isRequired,
    list: PropTypes.number.isRequired
};

export default Item;
