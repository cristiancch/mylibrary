import React from 'react';
import './BooksDetails.scss';
import AddToWishlistBtn from '../wishlist/AddToWishlistBtn';
import Link from "react-router-dom/es/Link";
import RemoveFromWishlistBtn from "../wishlist/RemoveFromWishlistBtn";
import BookReadedStatus from "./BookReadedStatus";

export default class BookDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isRead: false
        };

        this.getWishlist = this.getWishlist.bind(this);
        this.onReadedStatusChanged = this.onReadedStatusChanged.bind(this);
    }


    render() {

        let books = this.props.books;

        // let books;
        //
        // if (getReadedBooksFromLocalStorage())
        //     books = getReadedBooksFromLocalStorage();

        //TODO sa afiseze daca nu este gasita cartea + query mai avansat de cautare

        if (books.length || this.props.toSearch) {

            let book = books[this.props.id];

            if (this.props.toSearch) {
                if (!(this.props.toSearch.toLowerCase() === books[this.props.id].title.toLowerCase())) {
                    book = '';
                }
            }

            let url = '/bookDetail/' + this.props.id;

            if (book) {
                let categoryURL = '/category/' + book.category.toLowerCase();

                return (
                    <div className="allCards">
                        <div className="card">
                            {this.props.fromWishlist ? (
                                <div>
                                    <img src="/src/assets/images/book-cover-placeholder.png"/>
                                    <div className="container">
                                        <ul key={book.id}>
                                            <li>Title: {book.title}</li>
                                            <li>Author: {book.author}</li>
                                            <li>Details: {book.details}</li>
                                            <li>ISBN: {book.ISBN}</li>
                                            <li>Price: {book.price}</li>
                                            <li>Category: {book.category}</li>
                                        </ul>
                                        <RemoveFromWishlistBtn book={book}/>
                                        <BookReadedStatus
                                            readedStatus={book.readedStatus}
                                            book={book}
                                            onReadedStatusChanged={this.onReadedStatusChanged}
                                        />
                                    </div>
                                    <Link to={url} href={url}>Details..</Link>
                                </div>
                            ) : (
                                <div>
                                    <img src="/src/assets/images/book-cover-placeholder.png"/>
                                    <div className="container">
                                        <ul key={book.id}>
                                            <li>Title: {book.title}</li>
                                            <li>Author: {book.author}</li>
                                            <li>Details: {book.details}</li>
                                            <li>ISBN: {book.ISBN}</li>
                                            <li>Price: {book.price}</li>
                                            <li>
                                                <Link to={categoryURL}
                                                      href={categoryURL}
                                                      onClick={() => this.handleClick('dictionare')}>Category: {book.category}
                                                </Link>
                                            </li>
                                        </ul>
                                        <AddToWishlistBtn book={book}
                                                          wishlistBooks={this.getWishlist}
                                        />
                                        <BookReadedStatus
                                            readedStatus={book.readedStatus}
                                            book={book}
                                            onReadedStatusChanged={this.onReadedStatusChanged}
                                        />
                                    </div>
                                    < Link to={url} href={url}>Details..</Link>
                                </div>
                            )}
                        </div>
                    </div>
                );
            } else {
                return (null);
            }
        }
        else
            return (
                <h4>Loading, please wait</h4>
            );
    }

    getWishlist(books) {
        this.props.onReceiveBooks(books);
    }

    onReadedStatusChanged(status) {
        this.setState({
            isRead: status
        });
    }

}