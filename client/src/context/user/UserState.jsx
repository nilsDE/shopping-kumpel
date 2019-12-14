/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import axios from 'axios';
import userContext from './userContext';
import userReducer from './userReducer';
import { CHECK_LOGGED_IN, SET_LOADING, LOG_OUT } from '../types';

const UserState = props => {
    const initialState = {
        loggedIn: false,
        loading: false
    };
    const [state, dispatch] = useReducer(userReducer, initialState);

    // Actions

    const setLoading = () => dispatch({ type: SET_LOADING });

    const checkLoggedIn = async () => {
        setLoading();
        const res = await axios.get('/users/verify');
        dispatch({
            type: CHECK_LOGGED_IN,
            payload: res.data.msg
        });
    };

    const logOut = async () => {
        setLoading();
        const res = await axios.post('/users/signout');
        if (res.data === 'ok') {
            dispatch({
                type: LOG_OUT
            });
        }
    };

    // End actions

    const { children } = props;

    return (
        <userContext.Provider
            value={{
                loggedIn: state.loggedIn,
                loading: state.loading,
                checkLoggedIn,
                logOut
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserState;