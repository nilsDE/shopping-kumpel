import {
    GET_LISTS,
    GET_LISTS_FAIL,
    SET_LOADING,
    CREATE_LIST,
    CREATE_LIST_FAIL,
    UPDATE_LIST,
    UPDATE_LIST_FAIL,
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
    CREATE_VOCABULARY_ITEM,
    CREATE_VOCABULARY_ITEM_FAIL,
    DELETE_VOCABULARY_ITEM,
    DELETE_VOCABULARY_ITEM_FAIL,
    CLEAR_ERRORS,
    SET_ALERT_MESSAGE
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
        case CREATE_VOCABULARY_ITEM:
        case DELETE_VOCABULARY_ITEM:
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
        case UPDATE_LIST:
            return {
                ...state,
                loading: false,
                lists: action.payload.allLists,
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
            const list = state.lists.find(l => l.id === action.payload.listId);
            const toDel = state.lists.findIndex(l => l.id === action.payload.listId);
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
        case UPDATE_LIST_FAIL:
        case DELETE_LIST_FAIL:
        case GET_USERS_FAIL:
        case CREATE_COLLABS_FAIL:
        case DELETE_COLLAB_FAIL:
        case CREATE_ITEM_FAIL:
        case UPDATE_ITEM_FAIL:
        case DELETE_ITEM_FAIL:
        case CREATE_VOCABULARY_ITEM_FAIL:
        case DELETE_VOCABULARY_ITEM_FAIL:
        case SET_ALERT_MESSAGE:
            return {
                ...state,
                msg: action.payload,
                loading: false
            };
        case CLEAR_ERRORS:
            return { ...state, msg: null };
        default:
            return state;
    }
};
