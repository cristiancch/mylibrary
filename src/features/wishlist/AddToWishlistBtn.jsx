import React from 'react';
import {addBookToLocalStorageWishlist} from "../../helpers/localStorageTransformer";
import "./Wishlist.scss";

export default class AddToWishlistBtn extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(book) {
        addBookToLocalStorageWishlist(book.id);
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