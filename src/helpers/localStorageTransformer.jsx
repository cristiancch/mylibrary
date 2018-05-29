import React from 'react';
import {updateDB} from "./jsonServerTransformer";

export function getWishlistFromLocalStorage() {

    let localStorage = window.localStorage;

    if (localStorage.getItem('wishlist')) {
        let json = localStorage.getItem('wishlist');
        return JSON.parse(json);
    }
    return null;
}

export function getReadedBooksFromLocalStorage() {
    let localStorage = window.localStorage;

    if (localStorage.getItem('readedBooks')) {
        let json = localStorage.getItem('readedBooks');
        return JSON.parse(json);
    }
    return null;

}

export function removeBookFromLocalStorageWishlist(book) {

    let localStorage = window.localStorage;
    if (localStorage.getItem('wishlist') === null || localStorage.getItem('wishlist') === '')
        localStorage.setItem('wishlist', '');

    let json = localStorage.getItem('wishlist');
    let books = JSON.parse(json);

    let booksArray = [...books];
    let index = booksArray.indexOf(book);

debugger;

    booksArray.splice(index, 1);

    json = JSON.stringify(booksArray);
    localStorage.removeItem('wishlist');
    localStorage.setItem('wishlist', json);
}

export function modifyReadedStatus(book, status) {

    //remove the book from parameter from books localStorage

    let localStorage = window.localStorage;
    if (!localStorage.getItem('readedBooks'))
        localStorage.setItem('readedBooks', '');

    let json = localStorage.getItem('readedBooks');
    let books = JSON.parse(json);

    let arr = [...books];

    function findSearchedBook(searchedBook) {
        return (searchedBook.id === book.id &&
            searchedBook.title === book.title &&
            searchedBook.author === book.author &&
            searchedBook.details === book.details &&
            searchedBook.price === book.price &&
            searchedBook.category === book.category
        );
    }

    let index = arr.findIndex(findSearchedBook);

    if (book.readedStatus === true && status === false) {
        book.readedStatus = false;
    }

    if (book.readedStatus === false && status === true) {
        book.readedStatus = true;
    }


    arr.splice(index, 1, book);

    //put the modified book back in the readedBooks localStorage

    json = JSON.stringify(arr);
    localStorage.removeItem('wishlist');
    localStorage.setItem('readedBooks', json);

    updateDB(book);
}

export function addBookToLocalStorageWishlist(book) {

    let localStorage = window.localStorage;
    if (!localStorage.getItem('wishlist')) {

        let books = [];
        books.push(book);
        let json = JSON.stringify(books);
        localStorage.setItem('wishlist', json);
    } else {
        let json = localStorage.getItem('wishlist');
        let books = JSON.parse(json);

        books.push(book);
        json = JSON.stringify(books);

        localStorage.removeItem('wishlist');
        localStorage.setItem('wishlist', json);
    }
}

export function addReadedBooksToLocalStorage(books) {

    let localStorage = window.localStorage;
    localStorage.removeItem('readedBooks');
    if (books.length)
        if (!localStorage.getItem('readedBooks')) {
            let json = JSON.stringify(books);
            localStorage.setItem('readedBooks', json);
        }
}





