import { DELETE_ITEM, CREATE_ITEM, UPDATE_ITEM } from '../types';

export default (state, action) => {
    switch (action.type) {
        case DELETE_ITEM:
            return {
                ...state,
                loading: false,
                items: state.items.filter(i => i.id !== action.payload.id)
            };
        case CREATE_ITEM:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload]
            };
        case UPDATE_ITEM:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload]
            };
        default:
            return state;
    }
};
