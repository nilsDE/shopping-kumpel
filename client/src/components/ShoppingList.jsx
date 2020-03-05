import React, { useState, useEffect, useContext, Fragment } from 'react';
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

const ShoppingList = () => {
    const listContext = useContext(ListContext);
    const userContext = useContext(UserContext);
    const {
        getLists,
        lists,
        createList,
        deleteList,
        loadingList,
        reference,
        getCollabs,
        collabs,
        users
    } = listContext;
    const { loggedIn, loading, user } = userContext;

    const [newTodo, setNewTodo] = useState('');
    const [selectedList, setSelectedList] = useState();

    // COMPONENT DID MOUNT
    useEffect(() => {
        getLists(user.id);
        socket = io();
        socket.on('change', () => {
            getLists(user.id);
        });
        // eslint-disable-next-line
    }, []);

    // COMPONENT DID UPDATE
    useEffect(() => {
        if (reference === 'GET_LISTS' || reference === 'DELETE_LIST') {
            if (lists && lists.length !== 0) {
                setSelectedList(lists[0].id);
            }
        }
    }, [lists, reference]);

    useEffect(() => {
        getCollabs(selectedList);
    }, [selectedList]);

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

    let currentList = {};
    if (lists && lists.length > 0) {
        currentList = lists.find(l => +l.id === +selectedList);
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('/create', {
                description: newTodo,
                completed: false,
                lastModified: user.name,
                listId: currentList.id
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
    if (lists.length === 0) {
        return <Spinner />;
    }

    return !loggedIn ? (
        <h2 className="mt-5">You are logged out</h2>
    ) : (
        <div className="shopping-list">
            <div className="btn-row d-flex justify-content-between mb-3">
                <button
                    type="button"
                    className="list-btn mr-1"
                    disabled={loading || loadingList}
                    onClick={e => {
                        e.preventDefault();
                        showModal(user.id);
                    }}
                >
                    Make a list
                </button>

                <DropdownButton title="Select list" className="list-btn">
                    {lists && lists.length !== 0
                        ? lists
                              .sort((a, b) =>
                                  a.description.toLowerCase() >
                                  b.description.toLowerCase()
                                      ? 1
                                      : -1
                              )
                              .map(l => (
                                  <Dropdown.Item
                                      eventKey={l.id}
                                      onSelect={e => setSelectedList(e)}
                                      key={l.id}
                                  >
                                      {l.description}
                                  </Dropdown.Item>
                              ))
                        : null}
                </DropdownButton>

                <button
                    type="button"
                    className="ml-1 list-btn"
                    onClick={() => deleteList(user.id, selectedList)}
                    disabled={loading || loadingList || !lists}
                >
                    Delete list
                </button>
            </div>
            <p className="shopping-list-title">
                {currentList ? currentList.description : ''}
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

            {currentList && currentList.items && currentList.items.length > 0
                ? currentList.items
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

            <div className="d-flex justify-content-center mt-3">
                <button
                    type="button"
                    className="list-btn"
                    onClick={() => console.log('add collab')}
                    disabled={loading || loadingList || !lists}
                >
                    Share this list!
                </button>
            </div>
            <div className="d-flex flex-column justify-content-center mt-3">
                {collabs && collabs.length > 0 && (
                    <>
                        <p className="mb-0 small text-muted">Collaborators: </p>
                        {collabs.map(c => (
                            <p className="mb-0 small text-muted" key={c.id}>
                                {c.User.name}
                            </p>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default ShoppingList;
