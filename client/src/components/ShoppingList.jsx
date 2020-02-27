import React, { useState, useEffect, useContext, useRef } from 'react';
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
    const usePrevious = value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const listContext = useContext(ListContext);
    const userContext = useContext(UserContext);
    const { getLists, lists, createList, loadingList, reference } = listContext;
    const { loggedIn, loading, user } = userContext;

    const prevReference = usePrevious(reference);

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
        if (prevReference !== reference && reference === 'GET_LISTS') {
            setSelectedList(lists[0].id);
        }
    }, [lists, prevReference, reference]);

    const changeList = id => {
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

    let currentList = {};
    if (lists) {
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
    if (loading || loadingList || lists.length === 0) {
        return <Spinner />;
    }

    return !loggedIn ? (
        <h2 className="mt-5">You are logged out</h2>
    ) : (
        <div className="shopping-list">
            <DropdownButton title="Select list">
                {lists
                    .sort((a, b) =>
                        a.description.toLowerCase() >
                        b.description.toLowerCase()
                            ? 1
                            : -1
                    )
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
        </div>
    );
};

export default ShoppingList;
