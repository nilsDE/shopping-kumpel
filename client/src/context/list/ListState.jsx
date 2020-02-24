import React, { useReducer } from 'react';
import axios from 'axios';
import listContext from './listContext';
import listReducer from './listReducer';
import { GET_LISTS, SET_LOADING } from '../types';

const ListState = props => {
    const initialState = {
        loading: false,
        lists: {}
    };
    const [state, dispatch] = useReducer(listReducer, initialState);

    // Actions

    const setLoading = () => dispatch({ type: SET_LOADING });

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

    // End Actions

    const { children } = props;

    return (
        <listContext.Provider
            value={{
                loading: state.loading,
                lists: state.lists,
                getLists
            }}
        >
            {children}
        </listContext.Provider>
    );
};

export default ListState;
