import React from 'react';
import Bookshelf from "../bookshelf/Bookshelf";
import BooksCollection from "../../services/BooksCollection";
import WishlistCollection from "../../services/WishlistCollection";
import _ from 'lodash'

export default class Wishlist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allBooksFromDB: [],
            isUserLogged: {},
        };
        this.onBookRemovedInWishlist = this.onBookRemovedInWishlist.bind(this);
    }

    componentDidMount() {
        let localStorage = window.localStorage;

        let json = localStorage.getItem('loggedUser');
        if (json) {
            let user = JSON.parse(json);
            this.setState({
                isUserLogged: user.userUsername
            });
        } else {
            this.setState({
                allBooksFromDB: []
            })
        }

        let wishlistCollection = new WishlistCollection();

        const self = this;

        wishlistCollection.getBookFromWishlistByUsername(self.state.isUserLogged).then((res) => {
            let auxWishlist = [];

            res.forEach((book) => {
                auxWishlist.push(book[0])
            });
            self.setState({
                allBooksFromDB: auxWishlist,
            })
        });
    }

    componentWillMount() {
        let localStorage = window.localStorage;

        let json = localStorage.getItem('loggedUser');
        if (json) {
            let user = JSON.parse(json);
            this.setState({
                isUserLogged: user.userUsername
            });
        }
    }

    onBookRemovedInWishlist(book) {

        debugger;
        let wishlistCollection = new WishlistCollection();

        const self = this;
        wishlistCollection.getBookFromWishlistByUsername(self.state.isUserLogged).then((res) => {

            debugger;
            let auxWishlist = [];

            res.forEach((book) => {
                auxWishlist.push(book[0])
            });
            self.setState({
                allBooksFromDB: auxWishlist,
            })
        });
    }

    render() {
        if (_.isEmpty(this.state.isUserLogged)) {
            return (<p>Must be logged in to see wishlist</p>)
        }

        if (!this.state.allBooksFromDB.length) {
            return (<p>Empty wishlist!</p>)
        }

        return (
            <nav>
                <h2>All cards from wishlist</h2>
                {this.state.allBooksFromDB.length ? (
                    <Bookshelf
                        fromWishlist={true}
                        books={this.state.allBooksFromDB}
                        bookRemovedInWishlist={this.onBookRemovedInWishlist}
                    />
                ) : (
                    <h1>No books in wishlist..</h1>
                )}
            </nav>
        );

    }
}