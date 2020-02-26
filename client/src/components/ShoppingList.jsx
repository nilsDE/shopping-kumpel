import React, { useState, useEffect, useContext } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import withReactContent from 'sweetalert2-react-content';
import Item from './Item';
import SocketContext from './socket-context';
import '../App.css';
import UserContext from '../context/user/userContext';
import ListContext from '../context/list/listContext';
import Spinner from './Spinner';

let socket;
const MySwal = withReactContent(Swal);

// TODO: create initial list if no list available
// TODO: setList when page has loaded

const ShoppingList = () => {
    const listContext = useContext(ListContext);
    const userContext = useContext(UserContext);
    const { getLists, lists, createList, loadingList } = listContext;
    const { loggedIn, loading, user } = userContext;

    const [newTodo, setNewTodo] = useState('');
    const [list, setList] = useState();
    const [selectedList, setSelectedList] = useState();

    useEffect(() => {
        getLists(user.id);
        socket = io();
        socket.on('change', () => {
            getLists(user.id);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const currentList = lists.find(l => l.id === +selectedList);
        setList(currentList);
    }, [lists, selectedList]);

    const changeList = id => {
        const myList = lists.find(l => l.id === +id);
        setList(myList);
        setSelectedList(id);
    };

    const showModal = id => {
        MySwal.fire({
            title: <p>New list:</p>,
            showCancelButton: true,
            confirmButtonText: 'Save!',
            input: 'text',
            preConfirm: title => {
                createList(title, id);
            }
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('/create', {
                description: newTodo,
                completed: false,
                lastModified: user.name,
                listId: list.id
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
    if (loading || loadingList || lists.length === 0) {
        return <Spinner />;
    }

    return !loggedIn ? (
        <h2 className="mt-5">You are logged out</h2>
    ) : (
        <div className="shopping-list">
            <DropdownButton title="Select list">
                {lists
                    .sort((a, b) => (a.description > b.description ? 1 : -1))
                    .map(l => (
                        <Dropdown.Item
                            eventKey={l.id}
                            onSelect={e => changeList(e)}
                            key={l.id}
                        >
                            {l.description}
                        </Dropdown.Item>
                    ))}
            </DropdownButton>

            <button
                type="button"
                onClick={e => {
                    e.preventDefault();
                    showModal(user.id);
                }}
            >
                Make a list
            </button>
            <p className="shopping-list-title">
                {list ? list.description : ''}
            </p>
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
