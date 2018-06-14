import axios from "axios/index";
import BookModel from "./BookModel";

export default class BooksCollection {

    constructor() {
        this.allBooks = [];
    }

    getBooksFromDB() {
        return new Promise((resolve) => {
            resolve(
                axios.get('http://localhost:3000/books')
            );
        }).then(res => {
            return res.data;
        });
    }

    resToSet(res) {
        for (let book of res) {
            let bm = new BookModel(book);
            this.allBooks.push(bm);
        }
    }

    getAllBooks() {
        return this.getBooksFromDB().then((res) => {
            this.resToSet(res);
            return this.allBooks;
        });
    }

    getBookById(id) {
        return new Promise((resolve) => {
            resolve(
                axios.get(`http://localhost:3000/books/${id}`)
            );
        }).then((res) => {
            return res;
        })
    }

    getBooksIdsByCategory(category) {
        return this.getAllBooks().then(() => {
            let ids = [];
            if (this.allBooks.length) {
                ids = this.allBooks.filter(book => {
                    if (category.toLowerCase() === book.category.toLowerCase()) {
                        return book.id;
                    }
                });
            }
            return ids;
        });
    }
}

