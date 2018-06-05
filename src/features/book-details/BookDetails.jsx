import React from 'react';
import './BooksDetails.scss';
import BookDetailsHeader from "./BookDetailsHeader";
import BookDetailsModal from "./BookDetailsModal";


export default class BookDetails extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.getWishlist = this.getWishlist.bind(this);
        this.triggerModalOpen = this.triggerModalOpen.bind(this);
        this.onBookDeletedFromWishlist = this.onBookDeletedFromWishlist.bind(this);
    }

    triggerModalOpen() {
        this.refs.bookDetailsModal.toggleModal();
    }

    getWishlist(books) {
        this.props.onReceiveBooks(books);
    }

    onBookDeletedFromWishlist(book) {
        this.props.onBookRemovedFromWishlist(book);
    }

    render() {
        let book = this.props.book;
        if (book)
            if (this.props.toSearch) {
                if (book.title.toLowerCase().indexOf(this.props.toSearch.toLowerCase()) === -1) {
                    book = '';
                }
            }
        if (book) {
            return (
                <section className="card card--hover">
                    <h4>Card section</h4>
                    <div>
                        <h5>Card subsection from wishlist</h5>
                        <section className="container">
                            <BookDetailsHeader
                                book={book}
                            />
                            <p className="ShowDetails">
                                {book.details.substr(0, 100) + '..   '}
                                <a href={'#!'}
                                   onClick={this.triggerModalOpen}
                                   style={{fontSize: '12px'}}
                                >show more details</a>
                            </p>
                            <BookDetailsModal
                                ref="bookDetailsModal"
                                book={book}
                                fromWishlist={this.props.fromWishlist}
                                getWishlist={this.getWishlist}
                                bookDeleted={this.onBookDeletedFromWishlist}
                            />
                        </section>
                    </div>
                </section>
            );
        }
        else
            return (
                null
            );
    }
}


















