import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faList } from '@fortawesome/free-solid-svg-icons';
import NewList from './NewList';
import ListContext from '../../../context/list/listContext';
import AuthContext from '../../../context/auth/authContext';

import '../../../App.css';
import '../ShoppingList.css';

const MySwal = withReactContent(Swal);

const Header = ({ selectedList, setSelectedList }) => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);
    const { createList, deleteList, lists, loading } = listContext;
    const { user } = authContext;

    const showModal = () => {
        MySwal.fire({
            title: <p>New list:</p>,
            showCancelButton: false,
            showConfirmButton: false,
            html: <NewList createList={title => createList(title)} />
        });
    };

    return (
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
                              <Dropdown.Item eventKey={l.id} onSelect={e => setSelectedList(+e)} key={l.id}>
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
    );
};

export default Header;

Header.propTypes = {
    selectedList: PropTypes.number.isRequired,
    setSelectedList: PropTypes.func.isRequired
};
