import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Alert from '../Utils/Alert';
import Collabs from './Components/Collabs';
import ListBody from './Components/ListBody';
import ListContext from '../../context/list/listContext';
import Spinner from '../Utils/Spinner';

import '../../App.css';
import './ShoppingList.css';

const ListContainer = ({ match }) => {
    const listContext = useContext(ListContext);
    const { getLists, getUsers, lists, users, socket, msg, joinList, loading } = listContext;

    let currentList;
    if (lists && lists.length > 0 && !currentList) {
        currentList = lists.find(l => +l.id === +match.params.id);
    }

    useEffect(() => {
        joinList(currentList.id);
        getUsers();
        socket.on('change', () => {
            getLists();
        });
        // eslint-disable-next-line
    }, []);

    let listOwner = '';
    if (lists && lists.length > 0 && users && users.length > 0 && currentList) {
        const currentListUserId = lists.find(l => +l.id === +currentList.id);
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
                <ListBody listOwner={listOwner} currentList={currentList} />
                <Collabs users={users} listOwner={listOwner} currentList={currentList} />
            </div>
        </>
    );
};

export default ListContainer;

ListContainer.propTypes = {
    match: PropTypes.object.isRequired
};
