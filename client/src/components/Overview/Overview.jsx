/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect } from 'react';
import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../Utils/Spinner';

import './Overview.css';

const Overview = props => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);
    const { getLists, lists } = listContext;
    const { loadUser, user } = authContext;

    const loading = listContext.loading || authContext.loading;

    useEffect(() => {
        loadUser();
        getLists();
        // eslint-disable-next-line
    }, []);
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
            <p className="text-left">What list would you like to work on?</p>
            <div className="list-content">
                {!loading && lists && lists.length > 0
                    ? lists.map(list => (
                          <div
                              key={list.id}
                              className="list-item"
                              onClick={() => props.history.push(`/list/${list.id}`)}
                              role="button"
                          >
                              <div className="d-flex justify-content-start flex-column">
                                  <p className="text-left small text-muted mt-0 mb-0 ml-1">List name</p>
                                  <p className="text-left mt-0 mb-0 ml-1">{list.description}</p>
                              </div>
                              <div className="d-flex justify-content-start flex-column">
                                  <p className="text-left small text-muted mt-0 mb-0">Items</p>
                                  <p className="text-left">
                                      {list.item && list.item.length > 0 ? list.items.length : '-'}
                                  </p>
                              </div>
                              <div className="d-flex justify-content-start flex-column">
                                  <p className="text-left small text-muted mt-0 mb-0">Owner</p>
                                  <p className="text-left">
                                      {user && user.id && list.User && user.id === list.User.id
                                          ? 'Me'
                                          : list.User.name}
                                  </p>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default Overview;
