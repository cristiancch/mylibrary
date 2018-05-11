import React from 'react';
import {addBookToLocalStorageWishlist} from "../../helpers/localStorageTransformer";

export default class AddToWishlistBtn extends React.Component {

    constructor(props) {
        super(props);

        /*  this.state = {
              wishlistItems: []
          };*/

        this.handleClick = this.handleClick.bind(this);
        // this.sendWishlist = this.sendWishlist.bind(this);
    }

    handleClick(book) {
        console.log('Book ', book, ' added to wishlist');

        addBookToLocalStorageWishlist(book);

        /*this.setState(previousState => ({
            wishlistItems: [...previousState.wishlistItems, book]
        }));

        console.log('state in handleClick(): ', this.state.wishlistItems);
        this.sendWishlist();*/
    }

    /*sendWishlist() {
        let books = [...this.state.wishlistItems];
        console.log('sendWishlist(): ', books);
        this.props.wishlistBooks(books);
    }*/

    render() {
        return (
            <img
                className="wishlist_btn"
                src="/src/assets/images/addTo_wishlist-icon.png"
                onClick={() => this.handleClick(this.props.book)}
            />
        );
    }

}