import React from 'react';
import './Bookshelf.scss';
import BookDetails from "../book-details/BookDetails";

export default class Bookshelf extends React.Component {

    render() {

        let books = this.props.books;

        return (
            <nav className="allCards">
                <h2>All cards</h2>
                {books.map((book, index) =>
                    (this.props.category) ? (
                        (this.props.category.toLowerCase() === book.category.toLowerCase()) ? (
                            <BookDetails
                                books={books}
                                id={book.id}
                                toSearch={this.props.bookToSearch}
                                key={index}
                                fromBookshelf={true}
                                fromWishlist={this.props.fromWishlist}
                            />
                        ) : (null)
                    ) : (
                        <BookDetails
                            books={books}
                            id={book.id}
                            toSearch={this.props.bookToSearch}
                            key={index}
                            fromBookshelf={true}
                            fromWishlist={this.props.fromWishlist}
                        />
                    )
                )}
            </nav>
        );
    }
}