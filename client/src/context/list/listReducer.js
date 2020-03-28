import {
    GET_LISTS,
    GET_LISTS_FAIL,
    SET_LOADING,
    CREATE_LIST,
    CREATE_LIST_FAIL,
    DELETE_LIST,
    DELETE_LIST_FAIL,
    GET_COLLABS,
    GET_COLLABS_FAIL,
    CREATE_COLLABS,
    CREATE_COLLABS_FAIL,
    DELETE_COLLAB,
    DELETE_COLLAB_FAIL,
    CREATE_ITEM,
    CREATE_ITEM_FAIL,
    UPDATE_ITEM,
    UPDATE_ITEM_FAIL,
    DELETE_ITEM,
    DELETE_ITEM_FAIL,
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case CREATE_ITEM:
        case UPDATE_ITEM:
        case DELETE_ITEM:
            return {
                ...state,
                loading: false,
                lists: action.payload.lists,
                msg: action.payload.msg
            };
        case GET_LISTS:
            return {
                ...state,
                loading: false,
                lists: action.payload.lists,
                reference: action.type
            };
        case CREATE_LIST:
            return {
                ...state,
                loading: false,
                lists: [...state.lists, action.payload.createdList],
                msg: action.payload.msg
            };
        case DELETE_LIST:
            return {
                ...state,
                loading: false,
                lists: action.payload.allLists,
                reference: action.type,
                msg: action.payload.msg
            };
        case GET_COLLABS:
            return {
                ...state,
                loading: false,
                collabs: action.payload.collabs,
                users: action.payload.user,
                reference: action.type
            };
        case CREATE_COLLABS:
            return {
                ...state,
                loading: false,
                collabs: action.payload.collabs,
                msg: action.payload.msg
            };
        case DELETE_COLLAB:
            return {
                ...state,
                loading: false,
                collabs: state.collabs.filter(
                    c => c.id !== action.payload.collab.id
                ),
                msg: action.payload.msg
            };
        case GET_LISTS_FAIL:
        case CREATE_LIST_FAIL:
        case DELETE_LIST_FAIL:
        case GET_COLLABS_FAIL:
        case CREATE_COLLABS_FAIL:
        case DELETE_COLLAB_FAIL:
        case CREATE_ITEM_FAIL:
        case UPDATE_ITEM_FAIL:
        case DELETE_ITEM_FAIL:
            return {
                ...state,
                loading: false
            };
        case CLEAR_ERRORS:
            return { ...state, msg: null };
        default:
            return state;
    }
};
