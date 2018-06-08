import React from 'react';
import Bookshelf from "../bookshelf/Bookshelf";
import BooksCollection from "../../services/BooksCollection";
import WishlistCollection from "../../services/WishlistCollection";

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
        console.log('wishlist did mount');
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
            console.log('get books from wishlist, this: ', res[0]);
            self.setState({
                allBooksFromDB: res,
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
        console.log('Book deleted (Wishlist): ', book);
        let wishlistCollection = new WishlistCollection();
        wishlistCollection.getWishlist().then((res) => {
            this.setState({
                allBooksFromDB: res
            });
        });
    }

    render() {
        if (!this.state.isUserLogged) {
            return (<p>Must be logged in to see wishlist</p>)
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