import React from 'react';
import axios from "axios/index";


export function updateDB(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        "body": JSON.stringify(book),
        "headers": {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        "method": "PUT"
    }).then((res) => console.log(res));
}

export function getDB() {
    axios.get('http://localhost:3000/books')
        .then(res => {
            console.log('///////////// -> ', res.data);
            return res.data;
        });
}