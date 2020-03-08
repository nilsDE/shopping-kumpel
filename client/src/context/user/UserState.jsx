/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import axios from 'axios';
import userContext from './userContext';
import userReducer from './userReducer';
import { SET_LOADING, LOG_OUT, LOG_IN, SIGN_UP } from '../types';

const UserState = props => {
    const initialState = {
        loading: false,
        user: {},
        redirect: false
    };
    const [state, dispatch] = useReducer(userReducer, initialState);

    // Actions

    const setLoading = () => dispatch({ type: SET_LOADING });

    const logOut = async () => {
        setLoading();
        const res = await axios.post('/users/signout');
        if (res.data === 'ok') {
            dispatch({
                type: LOG_OUT
            });
        }
    };

    const signUp = async (name, email, password) => {
        setLoading();
        const res = await axios.post('/users', {
            name,
            email,
            password
        });
        if (res.data !== null) {
            dispatch({
                type: SIGN_UP,
                payload: res.data
            });
        }
    };

    const logIn = async (email, password) => {
        setLoading();
        const res = await axios.post('/users/signin', {
            email,
            password
        });
        if (res.data !== null) {
            dispatch({
                type: LOG_IN,
                payload: res.data
            });
        }
    };

    // End actions

    const { children } = props;

    return (
        <userContext.Provider
            value={{
                loading: state.loading,
                user: state.user,
                logOut,
                logIn,
                signUp,
                redirect: state.redirect
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export default UserState;
