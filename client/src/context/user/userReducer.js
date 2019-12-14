import { CHECK_LOGGED_IN, SET_LOADING, LOG_OUT } from '../types';

export default (state, action) => {
    switch (action.type) {
        case LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                loading: false
            };
        case CHECK_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload,
                loading: false
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};
