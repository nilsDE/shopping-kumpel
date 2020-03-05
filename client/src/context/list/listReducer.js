import {
    GET_LISTS,
    SET_LOADING,
    CREATE_LIST,
    DELETE_LIST,
    GET_COLLABS
} from '../types';

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
                lists: action.payload,
                reference: action.type
            };
        case DELETE_LIST:
            return {
                ...state,
                loadingList: false,
                lists: action.payload,
                reference: action.type
            };
        case SET_LOADING:
            return {
                ...state,
                loadingList: true
            };
        case GET_COLLABS:
            return {
                ...state,
                loadingList: false,
                collabs: action.payload[0],
                users: action.payload[1],
                reference: action.type
            };
        default:
            return state;
    }
};
