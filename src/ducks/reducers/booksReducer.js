import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function booksReducer(state = initialState.allBooks, action) {
    switch (action.type) {
        case types.GET_BOOKS_FROM_DB:
            return action.books;
        default:
            return state;
    }
}

