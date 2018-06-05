import axios from "axios/index";
import BookModel from "./BookModel";

export default class BooksCollection {

    constructor() {
        this.allBooks = [];
        this.wholeWishlist = [];
    }

    getBooksFromDB() {
        return new Promise((resolve, reject) => {
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

    resToWishlist(res) {
        for (let book of res) {

            if (book.bookTitle) {
                let auxBook = {};
                auxBook.id = book.bookId;
                auxBook.title = book.bookTitle;
                auxBook.author = book.bookAuthor;
                auxBook.category = book.bookCategory;
                auxBook.price = book.bookPrice;
                auxBook.cover = book.bookCover;
                auxBook.ISBN = book.bookISBN;
                auxBook.details = book.bookDescription;
                auxBook.readedStatus = book.bookReadStatus;
                auxBook.wishlistId = book.id;
                let bm = new BookModel(auxBook);
                this.wholeWishlist.push(bm);
            } else {
                let bm = new BookModel(book);
                this.wholeWishlist.push(bm);
            }
        }
    }

    getAllBooks() {
        return this.getBooksFromDB().then((res) => {
            this.resToSet(res);
            return this.allBooks;
        });
    }

    getWishlist() {
        return this.getBookFromWishlist().then((res) => {
            this.resToWishlist(res);
            return this.wholeWishlist;
        });
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

    getBookFromWishlist() {
        return new Promise((resolve, reject) => {
            resolve(
                axios.get('http://localhost:3000/wishlist')
            );
        }).then(res => {
            return res.data;
        });
    }

    addBookToWishlistDB(book) {
        return new Promise((resolve, reject) => {
            resolve(
                fetch('http://localhost:3000/wishlist', {
                    "body": JSON.stringify(book),
                    "headers": {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    "method": "POST"
                })
            );
        }).then((res) => {
            return res;
        })
    }

    removeBookFromWishlist(book) {
        console.log('Delete book with id', book.wishlistId);
        fetch(`http://localhost:3000/wishlist/${book.wishlistId}`, {
            "headers": {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            "method": "DELETE"
        }).then((res) => console.log(res));
    }
}

