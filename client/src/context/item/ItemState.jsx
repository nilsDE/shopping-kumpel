/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import itemContext from './itemContext';
import itemReducer from './itemReducer';
import { SET_LOADING, DELETE_ITEM, CREATE_ITEM, UPDATE_ITEM } from '../types';

const ItemState = props => {
    const initialState = {
        items: [],
        loading: false,
        socket: io()
    };
    const [state, dispatch] = useReducer(itemReducer, initialState);

    // Actions

    const setLoading = () => dispatch({ type: SET_LOADING });

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

    // End actions

    const { children } = props;

    return (
        <itemContext.Provider
            value={{
                loading: state.loading,
                items: state.items,
                deleteItem,
                createItem,
                updateItem,
                socket: state.socket
            }}
        >
            {children}
        </itemContext.Provider>
    );
};

export default ItemState;
