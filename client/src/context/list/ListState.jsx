/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import listContext from './listContext';
import listReducer from './listReducer';
import {
    SET_LOADING,
    GET_LISTS,
    GET_LISTS_FAIL,
    CREATE_LIST,
    CREATE_LIST_FAIL,
    UPDATE_LIST,
    UPDATE_LIST_FAIL,
    DELETE_LIST,
    DELETE_LIST_FAIL,
    GET_USERS,
    GET_USERS_FAIL,
    CREATE_COLLABS,
    CREATE_COLLABS_FAIL,
    DELETE_COLLAB,
    DELETE_COLLAB_FAIL,
    CREATE_ITEM,
    CREATE_ITEM_FAIL,
    UPDATE_ITEM,
    UPDATE_ITEM_FAIL,
    DELETE_ITEM,
    DELETE_ITEM_FAIL,
    CREATE_VOCABULARY_ITEM,
    CREATE_VOCABULARY_ITEM_FAIL,
    DELETE_VOCABULARY_ITEM,
    DELETE_VOCABULARY_ITEM_FAIL,
    CLEAR_ERRORS
} from '../types';

const socket = io();

const ListState = props => {
    const initialState = {
        loading: false,
        lists: [],
        users: [],
        socket,
        msg: null
    };
    const [state, dispatch] = useReducer(listReducer, initialState);

    // Actions

    const setLoading = () => dispatch({ type: SET_LOADING });

    const joinList = list => socket.emit('joinList', list);

    const leaveList = list => {
        socket.emit('leaveList', list);
    };

    const getLists = async () => {
        try {
            setLoading();
            const res = await axios.get('/api/lists');
            dispatch({
                type: GET_LISTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_LISTS_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const createList = async (description, listType = 1) => {
        try {
            setLoading();
            const res = await axios.post('/api/lists', {
                description,
                listType
            });
            dispatch({
                type: CREATE_LIST,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: CREATE_LIST_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const updateList = async (id, description) => {
        try {
            setLoading();
            const res = await axios.put('/api/lists', {
                id,
                description
            });
            dispatch({
                type: UPDATE_LIST,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: UPDATE_LIST_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const deleteList = async listId => {
        try {
            setLoading();
            const res = await axios.delete('/api/lists', {
                params: { listId }
            });
            dispatch({
                type: DELETE_LIST,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: DELETE_LIST_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const getUsers = async () => {
        try {
            setLoading();
            const res = await axios.get('/api/lists/users', {});
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_USERS_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const createCollab = async (collabUserId, listId) => {
        try {
            setLoading();
            const res = await axios.post('/api/lists/collabs', {
                collabUserId,
                listId
            });
            dispatch({
                type: CREATE_COLLABS,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: CREATE_COLLABS_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const deleteCollab = async (collabId, listId) => {
        try {
            setLoading();
            const res = await axios.delete('/api/lists/collabs', {
                params: { collabId, listId }
            });
            dispatch({
                type: DELETE_COLLAB,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: DELETE_COLLAB_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const createItem = async (description, lastModified, listId, userId) => {
        try {
            setLoading();
            const res = await axios.post('/api/lists/items', {
                description,
                completed: false,
                lastModified,
                listId
            });
            state.socket.emit('sendItem', listId, userId);
            dispatch({
                type: CREATE_ITEM,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: CREATE_ITEM_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const createVocabularyItem = async (lang1, lang2, listId) => {
        try {
            setLoading();
            const res = await axios.post('/api/lists/vocabularyitems', {
                lang1,
                lang2,
                listId
            });
            dispatch({
                type: CREATE_VOCABULARY_ITEM,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: CREATE_VOCABULARY_ITEM_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const updateItem = async (description, completed, id, lastModified, list, userId) => {
        try {
            setLoading();
            const res = await axios.put('/api/lists/items', {
                description,
                completed,
                id,
                lastModified
            });
            state.socket.emit('sendItem', list, userId);
            dispatch({
                type: UPDATE_ITEM,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: UPDATE_ITEM_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const deleteItem = async (item, list, userId) => {
        try {
            setLoading();
            const res = await axios.delete('/api/lists/items', {
                params: { id: item.id }
            });
            state.socket.emit('sendItem', list, userId);
            dispatch({
                type: DELETE_ITEM,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: DELETE_ITEM_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    const deleteVocabularyItem = async id => {
        try {
            setLoading();
            const res = await axios.delete('/api/lists/vocabularyitems', {
                params: { id }
            });
            dispatch({
                type: DELETE_VOCABULARY_ITEM,
                payload: res.data
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        } catch (err) {
            dispatch({
                type: DELETE_VOCABULARY_ITEM_FAIL,
                payload: err.response.data.msg
            });
            setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 2000);
        }
    };

    // End Actions

    const { children } = props;

    return (
        <listContext.Provider
            value={{
                loading: state.loading,
                lists: state.lists,
                users: state.users,
                socket: state.socket,
                msg: state.msg,
                getLists,
                createList,
                updateList,
                deleteList,
                getUsers,
                createCollab,
                deleteCollab,
                createItem,
                updateItem,
                deleteItem,
                createVocabularyItem,
                deleteVocabularyItem,
                joinList,
                leaveList,
                dispatch
            }}
        >
            {children}
        </listContext.Provider>
    );
};

export default ListState;
