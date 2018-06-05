import React from 'react';
import "./Wishlist.scss";
import BooksCollection from "../../services/BooksCollection";


export default class AddToWishlistBtn extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(book) {
        let booksCollection = new BooksCollection();
        booksCollection.addBookToWishlistDB(book).then((res) => {
            console.log(res);
        });
        this.props.onBookAdded(book);
    }

    render() {
        return (
            <img
                className="wishlist__button"
                src="/src/assets/images/addTo_wishlist-icon.png"
                onClick={() => this.handleClick(this.props.book)}
            />

        );
    }
}