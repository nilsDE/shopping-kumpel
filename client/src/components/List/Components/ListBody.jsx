import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Item from './Item';
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
        <div>
            {!selectedList ? (
                'Select a list!'
            ) : (
                <>
                    <p className="shopping-list-title">{currentList ? currentList.description : ''}</p>
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
            )}
        </div>
    );
};

export default ListBody;

ListBody.propTypes = {
    selectedList: PropTypes.number.isRequired,
    currentList: PropTypes.object.isRequired
};
