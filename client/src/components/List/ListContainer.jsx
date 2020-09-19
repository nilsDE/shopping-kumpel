import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Alert from '../Utils/Alert';
import Collabs from './Components/Collabs';
import ListBody from './Components/ListBody';
import VocabularyBody from './Components/VocabularyBody';
import ListContext from '../../context/list/listContext';
import { CLEAR_ERRORS, SET_ALERT_MESSAGE } from '../../context/types';
import useLoadingSpinner from '../Utils/useLoadingSpinner';

import '../../App.css';
import './ShoppingList.css';

const ListContainer = ({ match }) => {
    const listContext = useContext(ListContext);
    const { getLists, getUsers, lists, users, socket, msg, joinList, leaveList, dispatch } = listContext;

    const { isLoading: loading, loadingSpinner } = useLoadingSpinner('dark');

    let currentList;
    if (lists && lists.length > 0 && !currentList) {
        currentList = lists.find(l => +l.id === +match.params.id);
    }

    const referencedUsers = useRef();
    referencedUsers.current = users;

    useEffect(() => {
        joinList(currentList.id);
        if (!referencedUsers.current || !referencedUsers.current.length) getUsers();
        socket.on('change', (list, userId) => {
            getLists();
            const changeMadeBy = referencedUsers.current.find(
                user => parseInt(user.id, 10) === parseInt(userId, 10)
            );
            let alertText = 'Something got changed!';
            if (changeMadeBy !== null && changeMadeBy !== undefined)
                alertText = `${changeMadeBy.name} just changed something!`;
            dispatch({ type: SET_ALERT_MESSAGE, payload: alertText });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        });
        return () => {
            leaveList(currentList.id);
        };
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

    if (lists.length === 0) {
        return (
            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                {loadingSpinner}
            </div>
        );
    }

    return (
        <>
            <Alert type="info" msg={msg} />
            <div className="shopping-list">
                <div className="title-container">
                    <Link to="/overview" className="title-back-btn">
                        <button
                            type="button"
                            className="edit-btn-overview title-back-btn"
                            disabled={loading}
                            onClick={() => {}}
                        >
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
