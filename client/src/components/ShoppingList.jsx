import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import Item from './Item';
import SocketContext from './socket-context';
import '../App.css';
import UserContext from '../context/user/userContext';
import ListContext from '../context/list/listContext';
import Spinner from './Spinner';

let socket;

const ShoppingList = () => {
    const listContext = useContext(ListContext);
    const userContext = useContext(UserContext);
    const { getLists, lists } = listContext;
    const { loggedIn, loading, user } = userContext;

    const [newTodo, setNewTodo] = useState('');
    const [list, setList] = useState();

    useEffect(() => {
        getLists(user.id);
        socket = io();
        socket.on('change', () => {
            getLists(user.id);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => setList(lists[0]), [lists]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('/create', {
                description: newTodo,
                completed: false,
                lastModified: user.name,
                listId: 1
            })
            .then(res => {
                if (res.data === 'created') {
                    socket.emit('sendItem');
                    setNewTodo('');
                    getLists(user.id);
                }
            });
    };

    const deleteItem = item => {
        axios
            .post('/delete', {
                id: item.id
            })
            .then(res => {
                if (res.data === 'deleted') {
                    socket.emit('sendItem');
                    getLists(user.id);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    if (loading) {
        return <Spinner />;
    }

    return !loggedIn ? (
        <h2 className="mt-5">You are logged out</h2>
    ) : (
        <div className="shopping-list">
            <button
                type="button"
                onClick={e => {
                    e.preventDefault();
                    getLists(user.id);
                }}
            >
                Make a list
            </button>
            <p className="shopping-list-title">Your Shopping List</p>
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Control
                    className="mb-4"
                    name="newTodo"
                    type="text"
                    value={newTodo}
                    placeholder="Enter new item..."
                    onChange={e => setNewTodo(e.target.value)}
                ></Form.Control>
            </Form>

            {list && list.items && list.items.length > 0
                ? list.items
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                      .map(item => (
                          <SocketContext.Provider key={item.id} value={socket}>
                              <Item
                                  key={item.id}
                                  item={item}
                                  getAllItems={() => getLists(user.id)}
                                  deleteItem={itemToDelete =>
                                      deleteItem(itemToDelete)
                                  }
                              />
                          </SocketContext.Provider>
                      ))
                : null}
        </div>
    );
};

export default ShoppingList;
