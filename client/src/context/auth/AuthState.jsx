/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import authContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    CLEAR_ERRORS,
    SET_LOADING
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: null,
        loading: false,
        error: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const setLoading = () => dispatch({ type: SET_LOADING });

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // Register User
    const register = async formData => {
        setLoading();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            });
        }
    };

    // Login User
    const login = async formData => {
        setLoading();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            });
        }
    };

    // Logout
    const logout = () => dispatch({ type: LOG_OUT });

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    const { children } = props;

    return (
        <authContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                clearErrors,
                loadUser,
                login,
                logout
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthState;
