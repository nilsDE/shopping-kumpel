import React, { useState, useEffect, useContext } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Item from './Item';
import '../App.css';
import UserContext from '../context/user/userContext';
import ListContext from '../context/list/listContext';
import Spinner from './Spinner';

const MySwal = withReactContent(Swal);

const ShoppingList = () => {
    const listContext = useContext(ListContext);
    const userContext = useContext(UserContext);
    const {
        getLists,
        createList,
        deleteList,
        loadingList,
        getCollabs,
        createCollab,
        deleteCollab,
        createItem,
        lists,
        reference,
        collabs,
        users,
        socket
    } = listContext;
    const { loading, user } = userContext;

    const [newTodo, setNewTodo] = useState('');
    const [selectedList, setSelectedList] = useState();

    // DONE: Remove all backend calls from this file
    // DONE: Allow user to create collabs
    // DONE: Allow user to delete collabs
    // DONE: fix UnhandledPromiseRejectionWarning
    // DONE: Clean up socket.io context and check when it triggers and what
    // DONE: Combine item context into list context
    // DONE: Prevent reloading all lists after changing items - data already comes from the reducer
    // DONE: keep previous list selection after api calls
    // DONE: List owner can delete all collabs, collab user can only delete themselves - FE
    // TODO: keep previous list selection after collab user has changed something
    // TODO: check BE queries for authorization
    // TODO: Check why app crashes after logout and go back to login
    // TODO: Refactor to JWT
    // TODO: Refactor protected routes in backend and frontend
    // TODO: Refactor socket.io so that it only triggers actions where the actual user is involved.
    // TODO: Clean up the error handling and show feedback to the user

    // COMPONENT DID MOUNT
    useEffect(() => {
        getLists(user.id);
        socket.on('change', () => {
            getLists(user.id);
        });
        // eslint-disable-next-line
    }, []);

    // COMPONENT DID UPDATE
    useEffect(() => {
        if (reference === 'GET_LISTS' || reference === 'DELETE_LIST') {
            if (lists && lists.length !== 0 && lists instanceof Array) {
                setSelectedList(lists[0].id);
            }
        }
    }, [lists, reference]);

    useEffect(() => {
        getCollabs(selectedList);
        // eslint-disable-next-line
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

    const handleSubmit = e => {
        e.preventDefault();
        createItem(newTodo, user.name, currentList.id);
        setNewTodo('');
    };

    let currentList = {};
    if (lists && lists.length > 0) {
        currentList = lists.find(l => +l.id === +selectedList);
    }

    let listOwner = '';

    if (
        lists &&
        lists.length > 0 &&
        users &&
        users.length > 0 &&
        selectedList
    ) {
        const currentListUserId = lists.find(l => +l.id === +selectedList);

        if (currentListUserId) {
            listOwner = users.find(u => u.id === currentListUserId.userId).name;
        }
    }

    if (lists.length === 0) {
        return <Spinner />;
    }

    return (
        <div className="shopping-list">
            <div className="btn-row d-flex justify-content-between mb-3">
                <button
                    type="button"
                    className="list-btn list-btn-fixed-width mr-1"
                    disabled={loading || loadingList}
                    onClick={e => {
                        e.preventDefault();
                        showModal(user.id);
                    }}
                >
                    Make a list
                </button>

                <DropdownButton
                    title="Select list"
                    className="list-btn list-btn-fixed-width"
                >
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
                    className="ml-1 list-btn list-btn-fixed-width"
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
                          <Item key={item.id} item={item} socket={socket} />
                      ))
                : null}

            {users && users.length > 0 && listOwner === user.name && (
                <div className="d-flex justify-content-center mt-3">
                    <DropdownButton
                        title="Select a user to share the list!"
                        className="list-btn"
                    >
                        {users.map(u => (
                            <Dropdown.Item
                                eventKey={u.id}
                                onSelect={e => createCollab(e, selectedList)}
                                key={u.id}
                            >
                                {u.email}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
            )}
            <div className="d-flex flex-column justify-content-center mt-3">
                <p className="mb-0 small text-muted">{`List owner: ${
                    listOwner === user.name ? 'me' : listOwner
                }`}</p>
                {collabs &&
                    collabs.length > 0 &&
                    users &&
                    users.length > 0 &&
                    listOwner === user.name && (
                        <>
                            <p className="mb-0 small text-muted">
                                Collaborators:{' '}
                            </p>
                            {collabs.map(c => (
                                <div
                                    className="d-flex justify-content-center"
                                    key={c.id}
                                >
                                    <p className="mb-0 small text-muted">
                                        {c.User.name === user.name
                                            ? 'me'
                                            : c.User.name}
                                    </p>
                                    <button
                                        onClick={() =>
                                            deleteCollab(
                                                user.id,
                                                c.id,
                                                selectedList
                                            )
                                        }
                                        className="general-btn ml-1 delete-btn"
                                        type="button"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
            </div>
        </div>
    );
};

export default ShoppingList;
