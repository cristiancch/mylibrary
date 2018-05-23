import React from 'react';

export default class BookDetailsHeader extends React.Component {
    render() {
        let book = this.props.book;
        return (
            <div>
                <h5>BookDetailsHeader</h5>
                <h6>Container section</h6>
                <p className="titleAndAuthor">{book.title} - {book.author}</p>
                <img
                    className="bookCover"
                    src={book.cover}/>
            </div>
        );
    }
}