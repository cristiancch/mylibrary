import React from 'react';
import axios from 'axios';

let books = [];

axios.get('http://localhost:3000/books')
    .then(res => {
        books = res.data;
    });

if (books)
    module.exports = Object.freeze({
        books: books,
        ceva: 'Ceva'
    });


