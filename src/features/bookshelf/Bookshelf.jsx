import React from 'react';
import './Bookshelf.scss';
import BookDetails from "../book-details/BookDetails";

export default class Bookshelf extends React.Component {

    render() {

        let books = {};
        let ids = [];

        if (this.props.category) {
            ids = this.props.books.filter(book => {
                if (this.props.category.toLowerCase() === book.category.toLowerCase()) {
                    console.log('book.id: ', book.id);
                    return book.id;
                }
            })
        }
        else {
            ids = this.props.books.map(book => {
                    return book.id;
                })
        }

        books = this.props.books;

        return (
            <nav className="allCards">
                <h2>AllCards</h2>
                {ids.map((id, index) =>
                    <BookDetails
                        books={books}
                        id={id}
                        toSearch={this.props.bookToSearch}
                        key={index}
                        fromBookshelf={true}
                        fromWishlist={this.props.fromWishlist}
                    />
                )}
            </nav>
        )
    }
}