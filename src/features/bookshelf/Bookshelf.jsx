import React from 'react';
import './Bookshelf.scss';
import BookDetails from "../book-details/BookDetails";

export default class Bookshelf extends React.Component {

    constructor(props) {
        super(props);
        /*
                this.state = {
                    wasAddedNewBook: true,
                    allBooks: null,
                    category: ''
                };*/
        this.onBookDeletedFromWishlist = this.onBookDeletedFromWishlist.bind(this);
    }

    onBookDeletedFromWishlist(book) {
        this.props.bookRemovedInWishlist(book);
    }

    render() {
        return (
            <nav className="allCards">
                <h2>AllCards</h2>
                {this.props.books.map((book, index) =>
                    <BookDetails
                        book={book}
                        toSearch={this.props.bookToSearch}
                        key={index}
                        fromBookshelf={true}
                        fromWishlist={this.props.fromWishlist}
                        onBookRemovedFromWishlist={this.onBookDeletedFromWishlist}
                    />
                )}
            </nav>
        )

    }
}