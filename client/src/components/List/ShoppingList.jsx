import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Alert from '../Utils/Alert';
import Collabs from './Components/Collabs';
import ListBody from './Components/ListBody';
import ListContext from '../../context/list/listContext';
import Spinner from '../Utils/Spinner';

import '../../App.css';
import './ShoppingList.css';

const ShoppingList = ({ match }) => {
    const listContext = useContext(ListContext);
    const { getLists, getUsers, lists, users, socket, msg, joinList, loading } = listContext;

    const selectedList = +match.params.id;

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

    let listOwner = '';

    if (lists && lists.length > 0 && users && users.length > 0 && selectedList) {
        const currentListUserId = lists.find(l => +l.id === +selectedList);

        if (currentListUserId) {
            const owner = users.find(u => u.id === currentListUserId.userId);
            if (owner) {
                listOwner = owner.name;
            }
        }
    }

    if (lists.length === 0 || loading) {
        return <Spinner />;
    }

    return (
        <>
            <Alert type="info" msg={msg} />
            <div className="shopping-list">
                <ListBody selectedList={selectedList} listOwner={listOwner} currentList={currentList} />
                <Collabs
                    users={users}
                    selectedList={selectedList}
                    listOwner={listOwner}
                    currentList={currentList}
                />
            </div>
        </>
    );
};

export default ShoppingList;

ShoppingList.propTypes = {
    match: PropTypes.object.isRequired
};
