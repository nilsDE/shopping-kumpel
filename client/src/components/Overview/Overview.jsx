import React, { useContext, useEffect } from 'react';
import ListContext from '../../context/list/listContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../Utils/Spinner';

import './Overview.css';

const Overview = () => {
    const listContext = useContext(ListContext);
    const authContext = useContext(AuthContext);
    const { getLists, getCollabs, lists, collabs, loading } = listContext;
    const { loadUser, user } = authContext;

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
                {lists.map(list => (
                    <div key={list.id} className="list-item">
                        <p className="item-property">{list.description}</p>
                        <p className="item-property">{list.items.length}</p>
                        <p className="item-property">{list.userId}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Overview;
