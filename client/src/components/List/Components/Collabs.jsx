import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faShare } from '@fortawesome/free-solid-svg-icons';
import ListContext from '../../../context/list/listContext';
import AuthContext from '../../../context/auth/authContext';

import Spinner from '../../Utils/Spinner';

import '../../../App.css';
import '../ShoppingList.css';

const Collabs = ({ currentList, listOwner }) => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);

    const { createCollab, deleteCollab, users, loading } = listContext;
    const { user } = authContext;

    if (loading) {
        return <Spinner />;
    }

    const collabList = users.filter(u => u.email !== user.email);

    return (
        <div>
            {collabList && collabList.length > 0 && listOwner === user.name && (
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
                        {collabList.map(u => (
                            <Dropdown.Item
                                eventKey={u.id}
                                onSelect={e => createCollab(+e, currentList.id)}
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
                {currentList &&
                    currentList.collabs &&
                    currentList.collabs.length > 0 &&
                    collabList &&
                    collabList.length > 0 &&
                    listOwner === user.name && (
                        <>
                            <p className="mb-0 small text-muted">Collaborators: </p>
                            {currentList.collabs.map(c => (
                                <div className="d-flex justify-content-center" key={c.id}>
                                    <p className="mb-0 small text-muted">
                                        {c.User.name === user.name ? 'me' : c.User.name}
                                    </p>
                                    <button
                                        onClick={() => deleteCollab(c.id, currentList.id)}
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
        </div>
    );
};

export default Collabs;

Collabs.propTypes = {
    currentList: PropTypes.object.isRequired,
    listOwner: PropTypes.string.isRequired
};
