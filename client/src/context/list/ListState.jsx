/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import axios from 'axios';
import listContext from './listContext';
import listReducer from './listReducer';
import {
    GET_LISTS,
    SET_LOADING,
    CREATE_LIST,
    DELETE_LIST,
    GET_COLLABS,
    CREATE_COLLABS,
    GENERAL_ERROR
} from '../types';

const ListState = props => {
    const initialState = {
        loadingList: false,
        reference: '',
        lists: [],
        collabs: [],
        users: []
    };
    const [state, dispatch] = useReducer(listReducer, initialState);

    // Actions

    const setLoading = () => dispatch({ type: SET_LOADING });

    const createList = async (description, userId) => {
        setLoading();
        const res = await axios.post('/list/create', {
            description,
            userId
        });
        if (res.data !== null) {
            dispatch({
                type: CREATE_LIST,
                payload: res.data
            });
        }
    };

    const getLists = async userId => {
        setLoading();
        const res = await axios.get('/list/index', {
            params: { userId }
        });
        if (res.data !== null) {
            dispatch({
                type: GET_LISTS,
                payload: res.data
            });
        }
    };

    const deleteList = async (userId, listId) => {
        setLoading();
        const res = await axios.delete('/list/delete', {
            params: { userId, listId }
        });
        if (res.data !== null) {
            if (res.data === 'error') {
                dispatch({
                    type: GENERAL_ERROR
                });
            } else {
                dispatch({
                    type: DELETE_LIST,
                    payload: res.data
                });
            }
        }
    };

    const getCollabs = async listId => {
        setLoading();
        const res = await axios.get('/collab/index', {
            params: { listId }
        });
        if (res.data !== null) {
            dispatch({
                type: GET_COLLABS,
                payload: res.data
            });
        }
    };

    const createCollab = async (userId, listId) => {
        setLoading();
        const res = await axios.post('/collab/create', {
            userId,
            listId
        });
        dispatch({
            type: CREATE_COLLABS,
            payload: res.data
        });
    };

    // End Actions

    const { children } = props;

    return (
        <listContext.Provider
            value={{
                loadingList: state.loadingList,
                lists: state.lists,
                reference: state.reference,
                collabs: state.collabs,
                users: state.users,
                getLists,
                createList,
                deleteList,
                getCollabs,
                createCollab
            }}
        >
            {children}
        </listContext.Provider>
    );
};

export default ListState;
