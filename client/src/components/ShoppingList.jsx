import React, { useState, useEffect, useContext } from 'react';
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faShare, faList } from '@fortawesome/free-solid-svg-icons';
import Alert from './Utils/Alert';
import Item from './Item';
import NewList from './NewList';
import '../App.css';
import ListContext from '../context/list/listContext';
import AuthContext from '../context/auth/authContext';
import Spinner from './Utils/Spinner';

import './ShoppingList.css';

const MySwal = withReactContent(Swal);

const ShoppingList = ({ match }) => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);
    const {
        getLists,
        createList,
        deleteList,
        getUsers,
        createCollab,
        deleteCollab,
        createItem,
        lists,
        users,
        socket,
        msg,
        joinList,
        loading
    } = listContext;
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

    const showModal = () => {
        MySwal.fire({
            title: <p>New list:</p>,
            showCancelButton: false,
            showConfirmButton: false,
            html: <NewList createList={title => createList(title)} />
        });
    };

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
                <div className="btn-row d-flex justify-content-between mb-3">
                    <button
                        type="button"
                        className="list-btn list-btn-fixed-width mr-1"
                        disabled={loading}
                        onClick={e => {
                            e.preventDefault();
                            showModal(user.id);
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} /> New list
                    </button>
                    <DropdownButton
                        title={
                            <span>
                                <FontAwesomeIcon icon={faList} />
                                &nbsp;Lists
                            </span>
                        }
                        className="list-btn list-btn-fixed-width"
                    >
                        {lists && lists.length !== 0
                            ? lists
                                  .sort((a, b) =>
                                      a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1
                                  )
                                  .map(l => (
                                      <Dropdown.Item
                                          eventKey={l.id}
                                          onSelect={e => setSelectedList(+e)}
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
                        onClick={() => deleteList(selectedList)}
                        disabled={loading || !lists || !selectedList}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete list
                    </button>
                </div>

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

                        {users && users.length > 0 && listOwner === user.name && (
                            <div className="d-flex justify-content-center mt-3">
                                <DropdownButton
                                    title={
                                        <span>
                                            <FontAwesomeIcon icon={faShare} />
                                            &nbsp;Share!
                                        </span>
                                    }
                                    className="list-btn list-btn-fixed-width"
                                >
                                    {users.map(u => (
                                        <Dropdown.Item
                                            eventKey={u.id}
                                            onSelect={e => createCollab(+e, selectedList)}
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
                            {currentList.collabs &&
                                currentList.collabs.length > 0 &&
                                users &&
                                users.length > 0 &&
                                listOwner === user.name && (
                                    <>
                                        <p className="mb-0 small text-muted">Collaborators: </p>
                                        {currentList.collabs.map(c => (
                                            <div className="d-flex justify-content-center" key={c.id}>
                                                <p className="mb-0 small text-muted">
                                                    {c.User.name === user.name ? 'me' : c.User.name}
                                                </p>
                                                <button
                                                    onClick={() => deleteCollab(c.id, selectedList)}
                                                    className="general-btn ml-1 delete-btn"
                                                    type="button"
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ShoppingList;
