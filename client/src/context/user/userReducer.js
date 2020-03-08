import { SET_LOADING, LOG_OUT, LOG_IN, SIGN_UP } from '../types';

export default (state, action) => {
    switch (action.type) {
        case LOG_OUT:
            return {
                ...state,
                loading: false
            };
        case LOG_IN:
            return {
                ...state,
                loading: false,
                user: action.payload,
                redirect: true
            };
        case SIGN_UP:
            return {
                ...state,
                loading: false,
                user: action.payload,
                redirect: true
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
