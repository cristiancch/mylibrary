import React from 'react';
import './BooksDetails.scss';
import AddToWishlistBtn from '../wishlist/AddToWishlistBtn';
import Link from "react-router-dom/es/Link";
import RemoveFromWishlistBtn from "../wishlist/RemoveFromWishlistBtn";
import BookReadedStatus from "./BookReadedStatus";
import ShowMoreDetails from './ShowMoreDetails';
import NoBookFound from "./NoBookFound";

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
                if (book.title.toLowerCase().indexOf(this.props.toSearch.toLowerCase()) === -1) {
                    book = '';
                }
            }

            let url = '/bookDetail/' + this.props.id;

            if (book) {
                let categoryURL = '/category/' + book.category.toLowerCase();

                return (
                    <section className="card card--hover">
                        <h4>Card section</h4>
                        {this.props.fromWishlist ? (
                            <div>
                                <h5>Card subsection</h5>
                                <img
                                    className="bookCover"
                                    src={book.cover}/>
                                <section className="container">
                                    <h6>Container section</h6>
                                    <ul key={book.id}>
                                        <li>Title: {book.title}</li>
                                        <li>Author: {book.author}</li>
                                        <li>ISBN: {book.ISBN}</li>
                                        <li>Price: {book.price}</li>
                                        <li>Category:
                                            <Link to={categoryURL}
                                                  href={categoryURL}
                                                  onClick={() => this.handleClick('dictionare')}> {book.category}
                                            </Link>
                                        </li>
                                        <li><ShowMoreDetails book={book}/></li>
                                        <li><Link to={url} href={url}>Details..</Link></li>
                                    </ul>
                                    <RemoveFromWishlistBtn book={book}/>
                                    <BookReadedStatus
                                        readedStatus={book.readedStatus}
                                        book={book}
                                        onReadedStatusChanged={this.onReadedStatusChanged}
                                    />
                                </section>
                            </div>
                        ) : (
                            <div>
                                <h5>Card subsection</h5>
                                <img
                                    className="bookCover"
                                    src={book.cover}/>
                                <section className="container">
                                    <h6>Container section</h6>
                                    <ul key={book.id}>
                                        <li>Title: {book.title}</li>
                                        <li>Author: {book.author}</li>
                                        <li>ISBN: {book.ISBN}</li>
                                        <li>Price: {book.price}</li>
                                        <li>Category:
                                            <Link to={categoryURL}
                                                  href={categoryURL}
                                                  onClick={() => this.handleClick('dictionare')}> {book.category}
                                            </Link>
                                        </li>
                                        <li><ShowMoreDetails book={book}/></li>
                                        <li>< Link to={url} href={url}>Details..</Link>
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

                                </section>
                            </div>
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