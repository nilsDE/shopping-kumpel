import {
    GET_LISTS,
    GET_LISTS_FAIL,
    SET_LOADING,
    CREATE_LIST,
    CREATE_LIST_FAIL,
    DELETE_LIST,
    DELETE_LIST_FAIL,
    GET_USERS,
    GET_USERS_FAIL,
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
                lists: action.payload.lists
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
                msg: action.payload.msg
            };
        case GET_USERS:
            return {
                ...state,
                loading: false,
                users: action.payload.user
            };
        case DELETE_COLLAB:
        case CREATE_COLLABS: {
            const allLists = state.lists;
            const list = state.lists.find(l => l.id === action.payload.collabs[0].listId);
            const toDel = state.lists.findIndex(l => l.id === action.payload.collabs[0].listId);
            list.collabs = action.payload.collabs;
            allLists.splice(toDel, 1, list);

            return {
                ...state,
                loading: false,
                lists: allLists,
                msg: action.payload.msg
            };
        }
        case GET_LISTS_FAIL:
        case CREATE_LIST_FAIL:
        case DELETE_LIST_FAIL:
        case GET_USERS_FAIL:
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
