import axios from "axios/index";
import WishlistModel from "./WishlistModel";
import BookModel from "./BookModel";
import BooksCollection from "./BooksCollection";

export default class WishlistCollection {

    constructor() {
        this.wholeWishlist = [];
        this.allBooks = []
    }

    addBookToWishlistDB(bookId, username) {

        this.getWishlistByBookId(bookId).then((res) => {
            let users = res[0].users;
            let wishlistId = res[0].id;

            if (users.indexOf(username) == -1) {
                users.push(username);
            }

            let wishlistAux = {};
            wishlistAux.id = bookId;
            wishlistAux.users = users;
            let wishlistModel = new WishlistModel(wishlistAux);

            // TODO implement removeBookFromWishlistByBookId
            this.removeBookFromWishlistByBookId(bookId);

            return new Promise((resolve, reject) => {
                resolve(
                    fetch('http://localhost:3000/wishlist', {
                        "body": JSON.stringify(wishlistModel),
                        "headers": {
                            "Accept": "application/json",
                            "Content-type": "application/json"
                        },
                        "method": "POST"
                    })
                );
            }).then((res) => {
                console.log('Book added to DB, status: ', res);
            })
        });

    }

    removeBookFromWishlistByBookId(bookId) {
        fetch(`http://localhost:3000/wishlist?bookId=${bookId}`, {
            "headers": {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            "method": "DELETE"
        }).then((res) => console.log(res));
    }

    getWishlistByBookId(bookId) {
        return new Promise((resolve, reject) => {
            resolve(
                axios.get(`http://localhost:3000/wishlist?bookId=${bookId}`)
            );
        }).then(res => {
            return res.data
        });
    }

    getAllBooks() {
        let booksCollection = new BooksCollection();
        return new Promise((resolve, reject) => {
            resolve(
                booksCollection.getAllBooks().then((res) => {
                    return res;
                })
            )
        }).then((res) => {
            return res;
        });
    }

    removeBookFromWishlist(book, user) {
        console.log('Book: ', book.bookId, ' which belongs to user ', user.userUsername);
        this.getWishlistByBookId(book.bookId).then((res) => {
            let users = res[0].users;

            let index = users.indexOf(user.userUsername);
            if (index !== -1)
                users.splice(index, 1);

            let wishlistAux = {};
            wishlistAux.id = book.bookId;
            wishlistAux.users = users;

            let wishlistModel = new WishlistModel(wishlistAux);
            this.getWishlistByBookId(book.bookId).then((res) => {
                let wishlistId = res[0].id;
                fetch(`http://localhost:3000/wishlist/${wishlistId}`, {
                    "headers": {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    "method": "DELETE"
                }).then((res) => {
                    return new Promise((resolve, reject) => {
                        resolve(
                            fetch('http://localhost:3000/wishlist', {
                                "body": JSON.stringify(wishlistModel),
                                "headers": {
                                    "Accept": "application/json",
                                    "Content-type": "application/json"
                                },
                                "method": "POST"
                            })
                        );
                    }).then((res) => {
                        console.log('Book added to DB, status: ', res);
                    })
                });

            });

        });
    }


    getBookFromWishlistByUsername(username) {

        const self = this;
        return new Promise((resolve, reject) => {
            resolve(
                this.getAllBooks().then((res) => {
                    let allBooks = res;
                    return this.getWishlist().then((res) => {
                        for (let book of res.data) {
                            if (book.users) {
                                for (let user of book.users) {
                                    if (user == username) {
                                        let auxWishlist = allBooks.filter(auxBook => {
                                            if (auxBook.bookId === book.bookId) {
                                                return book.id;
                                            }
                                        });
                                        self.wholeWishlist.push(auxWishlist);
                                    }
                                }
                            }
                        }
                        return self.wholeWishlist;
                    });
                })
            );
        }).then((res) => {
            return res;
        });
    }

    getWishlist() {
        return axios.get('http://localhost:3000/wishlist');
    }
}