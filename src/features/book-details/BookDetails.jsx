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
                    <section className="card">
                        <h4>Card section</h4>
                        {this.props.fromWishlist ? (
                            <section>
                                <h5>Card subsection</h5>
                                <figure><img src="/src/assets/images/book-cover-placeholder.png"/></figure>
                                <section className="container">
                                    <h6>Container section</h6>
                                    <header>
                                        <ul key={book.id}>
                                            <li>Title: {book.title}</li>
                                            <li>Author: {book.author}</li>
                                            <li>Details: {book.details}</li>
                                            <li>ISBN: {book.ISBN}</li>
                                            <li>Price: {book.price}</li>
                                            <li>Category: {book.category}</li>
                                        </ul>
                                    </header>
                                    <RemoveFromWishlistBtn book={book}/>
                                    <BookReadedStatus
                                        readedStatus={book.readedStatus}
                                        book={book}
                                        onReadedStatusChanged={this.onReadedStatusChanged}
                                    />
                                    <Link to={url} href={url}>Details..</Link>
                                </section>
                            </section>
                        ) : (
                            <section>
                                <h5>Card subsection</h5>
                                <figure><img src="/src/assets/images/book-cover-placeholder.png"/></figure>
                                <section className="container">
                                    <h6>Container section</h6>
                                    <header>
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
                                    </header>
                                    <AddToWishlistBtn book={book}
                                                      wishlistBooks={this.getWishlist}
                                    />
                                    <BookReadedStatus
                                        readedStatus={book.readedStatus}
                                        book={book}
                                        onReadedStatusChanged={this.onReadedStatusChanged}
                                    />
                                    < Link to={url} href={url}>Details..</Link>
                                </section>
                            </section>
                        )}
                    </section>

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