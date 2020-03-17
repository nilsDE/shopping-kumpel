import {
    GET_LISTS,
    GET_LISTS_FAIL,
    SET_LOADING,
    CREATE_LIST,
    CREATE_LIST_FAIL,
    DELETE_LIST,
    DELETE_LIST_FAIL,
    GET_COLLABS,
    CREATE_COLLABS,
    CREATE_COLLABS_FAIL,
    DELETE_COLLAB,
    DELETE_COLLAB_FAIL,
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    GET_COLLABS_FAIL
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
                collabs: action.payload.collabs,
                users: action.payload.user,
                reference: action.type
            };
        case GET_COLLABS_FAIL:
        case GET_LISTS_FAIL:
        case DELETE_LIST_FAIL:
        case CREATE_LIST_FAIL:
        case CREATE_COLLABS_FAIL:
        case DELETE_COLLAB_FAIL:
            return {
                ...state,
                loading: false
            };
        case CREATE_COLLABS:
            return {
                ...state,
                loading: false,
                collabs: action.payload.collabs
            };
        case DELETE_COLLAB:
            return {
                ...state,
                loading: false,
                collabs: state.collabs.filter(
                    c => c.id !== action.payload.collab.id
                )
            };
        default:
            return state;
    }
};
