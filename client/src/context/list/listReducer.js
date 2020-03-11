import {
    GET_LISTS,
    SET_LOADING,
    CREATE_LIST,
    DELETE_LIST,
    GET_COLLABS,
    CREATE_COLLABS,
    DELETE_COLLAB,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case CREATE_ITEM:
        case UPDATE_ITEM:
        case DELETE_ITEM:
            return {
                ...state,
                loading: false,
                lists: action.payload
            };
        case CREATE_LIST:
            return {
                ...state,
                loading: false,
                lists: [...state.lists, action.payload.createdList]
            };
        case GET_LISTS:
            return {
                ...state,
                loading: false,
                lists: action.payload.lists,
                reference: action.type
            };
        case DELETE_LIST:
            return {
                ...state,
                loading: false,
                lists: action.payload.allLists,
                reference: action.type
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_COLLABS:
            return {
                ...state,
                loading: false,
                collabs: action.payload[0],
                users: action.payload[1],
                reference: action.type
            };
        case CREATE_COLLABS:
            return {
                ...state,
                loading: false,
                collabs: [...action.payload]
            };
        case DELETE_COLLAB:
            return {
                ...state,
                loading: false,
                collabs: state.collabs.filter(c => c.id !== action.payload.id)
            };
        default:
            return state;
    }
};
