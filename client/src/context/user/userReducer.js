import { CHECK_LOGGED_IN, SET_LOADING, LOG_OUT, LOG_IN } from '../types';

export default (state, action) => {
    switch (action.type) {
        case LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                loading: false
            };
        case LOG_IN:
            return {
                ...state,
                loading: false,
                user: action.payload,
                loggedIn: true,
                redirect: true
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
