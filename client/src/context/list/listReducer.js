import { GET_LISTS, SET_LOADING } from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_LISTS:
            return {
                ...state,
                loading: false,
                lists: action.payload
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
