import { GET_LISTS, SET_LOADING, CREATE_LIST } from '../types';

export default (state, action) => {
    switch (action.type) {
        case CREATE_LIST:
            return {
                ...state,
                loadingList: false,
                lists: action.payload
            };
        case GET_LISTS:
            return {
                ...state,
                loadingList: false,
                lists: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loadingList: true
            };
        default:
            return state;
    }
};
