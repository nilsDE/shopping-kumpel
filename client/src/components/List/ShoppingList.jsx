import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Alert from '../Utils/Alert';
import Collabs from './Components/Collabs';
import Header from './Components/Header';
import Item from './Components/Item';
import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../Utils/Spinner';

import '../../App.css';
import './ShoppingList.css';

const ShoppingList = ({ match }) => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);
    const { getLists, getUsers, createItem, lists, users, socket, msg, joinList, loading } = listContext;
    const { user } = authContext;

    const [newTodo, setNewTodo] = useState('');
    const [selectedList, setSelectedList] = useState(+match.params.id);

    useEffect(() => {
        socket.on('change', () => {
            getLists();
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (selectedList) {
            joinList(selectedList);
            getUsers();
            getLists();
        }
        // eslint-disable-next-line
    }, [selectedList]);

    let currentList = {};
    if (lists && lists.length > 0) {
        currentList = lists.find(l => +l.id === +selectedList);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (newTodo && newTodo.length !== 0) {
            createItem(newTodo, user.name, currentList.id);
            setNewTodo('');
        }
    };

    let listOwner = '';

    if (lists && lists.length > 0 && users && users.length > 0 && selectedList) {
        const currentListUserId = lists.find(l => +l.id === +selectedList);

        if (currentListUserId) {
            listOwner = users.find(u => u.id === currentListUserId.userId).name;
        }
    }

    if (lists.length === 0 || loading) {
        return <Spinner />;
    }

    return (
        <>
            <Alert type="info" msg={msg} />
            <div className="shopping-list">
                <Header selectedList={selectedList} setSelectedList={name => setSelectedList(name)} />
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
                        <Collabs
                            users={users}
                            selectedList={selectedList}
                            listOwner={listOwner}
                            currentList={currentList}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default ShoppingList;

ShoppingList.propTypes = {
    match: PropTypes.object.isRequired
};
