import React from 'react';
import * as types from './actionTypes';
import BooksCollection from "../../services/BooksCollection";

export function getBooksSuccess(books) {
    return {
        type: types.GET_BOOKS_FROM_DB,
        books
    }
}

export function addBookToDBSuccess(book) {
    return {
        type: types.ADD_BOOK_TO_DB,
        book
    };
}

export function getBooksFromDB() {
    return dispatch => {
        let bookCollection = new BooksCollection();
        return bookCollection.getAllBooks().then((res) => {
            dispatch(getBooksSuccess(res));
        }).catch(error => {
            throw(error)
        });
    }
}

export function addBookToDB() {
    return dispatch => {

    };
}