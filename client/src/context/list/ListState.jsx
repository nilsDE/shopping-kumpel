/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import listContext from './listContext';
import listReducer from './listReducer';
import {
    SET_LOADING,
    GET_LISTS,
    CREATE_LIST,
    DELETE_LIST,
    GET_COLLABS,
    CREATE_COLLABS,
    DELETE_COLLAB,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    GENERAL_ERROR
} from '../types';

const socket = io();

const ListState = props => {
    const initialState = {
        loadingList: false,
        reference: '',
        lists: [],
        collabs: [],
        users: [],
        socket
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

    const getLists = async () => {
        setLoading();
        const res = await axios.get('/api/lists');
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

    const deleteCollab = async (userId, collabId, listId) => {
        setLoading();
        const res = await axios.delete('/collab/delete', {
            params: { userId, collabId, listId }
        });
        dispatch({
            type: DELETE_COLLAB,
            payload: res.data
        });
    };

    const deleteItem = async item => {
        setLoading();
        const res = await axios.post('/delete', {
            id: item.id
        });
        state.socket.emit('sendItem');
        dispatch({
            type: DELETE_ITEM,
            payload: res.data
        });
    };

    const createItem = async (description, lastModified, listId) => {
        setLoading();
        const res = await axios.post('/create', {
            description,
            completed: false,
            lastModified,
            listId
        });
        state.socket.emit('sendItem');
        dispatch({
            type: CREATE_ITEM,
            payload: res.data
        });
    };

    const updateItem = async (todo, completed, id, name) => {
        setLoading();
        const res = await axios.put('/update', {
            description: todo,
            completed,
            id,
            lastModified: name
        });
        state.socket.emit('sendItem');
        dispatch({
            type: UPDATE_ITEM,
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
                socket: state.socket,
                getLists,
                createList,
                deleteList,
                getCollabs,
                createCollab,
                deleteCollab,
                createItem,
                updateItem,
                deleteItem
            }}
        >
            {children}
        </listContext.Provider>
    );
};

export default ListState;
