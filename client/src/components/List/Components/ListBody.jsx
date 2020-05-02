import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Item from './Item';
import { Link } from 'react-router-dom';
import ListContext from '../../../context/list/listContext';
import AuthContext from '../../../context/auth/authContext';

import '../../../App.css';
import '../ShoppingList.css';

const ListBody = ({ selectedList, currentList }) => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);
    const { createItem } = listContext;
    const { user } = authContext;

    const [newTodo, setNewTodo] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (newTodo && newTodo.length !== 0) {
            createItem(newTodo, user.name, currentList.id);
            setNewTodo('');
        }
    };

    return (
        <>
            <div className="title-container">
                <Link to="/overview" className="title-back-btn">
                    <button type="button" className="edit-btn-overview title-back-btn" onClick={() => {}}>
                        <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
                    </button>
                </Link>
                <p className="shopping-list-title">{currentList ? currentList.description : ''}</p>
            </div>
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Control
                    className="mb-4"
                    name="newTodo"
                    type="text"
                    value={newTodo}
                    placeholder="Enter new item..."
                    onChange={e => setNewTodo(e.target.value)}
                    maxLength="255"
                />
            </Form>
            {currentList && currentList.items && currentList.items.length > 0
                ? currentList.items
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                      .map(item => <Item key={item.id} item={item} list={selectedList} />)
                : null}
        </>
    );
};

export default ListBody;

ListBody.propTypes = {
    selectedList: PropTypes.number.isRequired,
    currentList: PropTypes.object.isRequired
};
