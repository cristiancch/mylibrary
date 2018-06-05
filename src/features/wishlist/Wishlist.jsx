import React from 'react';
import Bookshelf from "../bookshelf/Bookshelf";
import BooksCollection from "../../services/BooksCollection";

export default class Wishlist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allBooksFromDB: [],
        };
        this.onBookRemovedInWishlist = this.onBookRemovedInWishlist.bind(this);
    }

    componentDidMount() {
        let booksCollection = new BooksCollection();
        booksCollection.getWishlist().then((res) => {
            this.setState({
                allBooksFromDB: res
            });
        });
    }

    onBookRemovedInWishlist(book) {
        console.log('Book deleted (Wishlist): ', book);
        let booksCollection = new BooksCollection();
        booksCollection.getWishlist().then((res) => {
            this.setState({
                allBooksFromDB: res
            });
        });
    }

    render() {
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