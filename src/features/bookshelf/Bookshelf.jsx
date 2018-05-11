import React from 'react';
import './Bookshelf.scss';
import BookDetails from "../book-details/BookDetails";
import {addReadedBooksToLocalStorage, getReadedBooksFromLocalStorage} from "../../helpers/localStorageTransformer";

export default class Bookshelf extends React.Component {


    render() {

        let books = this.props.books;
        /*addReadedBooksToLocalStorage(books);*/

        return (
            <div className="allCards">
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
                                // category={this.props.category}
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
                            // category={this.props.category}
                        />
                    )
                )}
            </div>
        );


    }

}