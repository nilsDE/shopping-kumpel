import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Alert from '../Utils/Alert';
import Collabs from './Components/Collabs';
import ListBody from './Components/ListBody';
import VocabularyBody from './Components/VocabularyBody';
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
                <div className="title-container">
                    <Link to="/overview" className="title-back-btn">
                        <button type="button" className="edit-btn-overview title-back-btn" onClick={() => {}}>
                            <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
                        </button>
                    </Link>
                    <p className="shopping-list-title">{currentList ? currentList.description : ''}</p>
                </div>
                {currentList.listType === 1 && (
                    <>
                        <ListBody currentList={currentList} />
                        <Collabs users={users} listOwner={listOwner} currentList={currentList} />
                    </>
                )}
                {currentList.listType === 2 && <VocabularyBody currentList={currentList} />}
            </div>
        </>
    );
};

export default ListContainer;

ListContainer.propTypes = {
    match: PropTypes.object.isRequired
};