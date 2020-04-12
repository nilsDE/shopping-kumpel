/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import withReactContent from 'sweetalert2-react-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';
import NewList from './NewList';
import Spinner from '../Utils/Spinner';

import './Overview.css';

const MySwal = withReactContent(Swal);

const Overview = props => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);
    const { getLists, createList, deleteList, lists } = listContext;
    const { loadUser, user } = authContext;

    const loading = listContext.loading || authContext.loading;

    useEffect(() => {
        loadUser();
        getLists();
        // eslint-disable-next-line
    }, []);

    const showModal = () => {
        MySwal.fire({
            title: <p>New list:</p>,
            showCancelButton: false,
            showConfirmButton: false,
            html: <NewList createList={title => createList(title)} />
        });
    };

    if (loading || !user) {
        return <Spinner />;
    }
    return (
        <div className="overview">
            <div className="titles">
                <div className="title-one">
                    <h1>{`Welcome, ${user.name}!`}</h1>
                </div>
                <div className="title-two">
                    <h1>{`Welcome, ${user.name}!`}</h1>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <p className="text-left">What list would you like to work on?</p>
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
                </div>
            </div>
            <div className="list-content">
                {!loading && lists && lists.length > 0
                    ? lists.map(list => (
                          <div
                              className="d-flex justify-content-center align-items-center mb-3"
                              key={list.id}
                          >
                              <div
                                  key={list.id}
                                  className="list-item mr-2"
                                  onClick={() => props.history.push(`/list/${list.id}`)}
                                  role="button"
                              >
                                  <div className="d-flex justify-content-start flex-column">
                                      <p className="text-left small text-muted mb-0">List name</p>
                                      <p className="text-left mb-0">{list.description}</p>
                                  </div>
                                  <div className="d-flex justify-content-start flex-column">
                                      <p className="text-left small text-muted mb-0">Items</p>
                                      <p className="text-left mb-0">
                                          {list.items && list.items.length > 0 ? list.items.length : '-'}
                                      </p>
                                  </div>
                                  <div className="d-flex justify-content-start flex-column">
                                      <p className="text-left small text-muted mb-0">Owner</p>
                                      <p className="text-left mb-0">
                                          {user && user.id && list.User && user.id === list.User.id
                                              ? 'Me'
                                              : list.User.name}
                                      </p>
                                  </div>
                              </div>
                              <div className="btn-row d-flex justify-content-between ml-2" key="delete">
                                  <button
                                      type="button"
                                      className="edit-btn-overview mr-1"
                                      disabled={loading}
                                      onClick={e => {
                                          e.preventDefault();
                                          deleteList(list.id);
                                      }}
                                  >
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                  </button>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default Overview;

Overview.propTypes = {
    history: PropTypes.object.isRequired
};
