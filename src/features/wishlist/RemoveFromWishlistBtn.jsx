import React from 'react';
import {removeBookFromLocalStorageWishlist} from "../../helpers/localStorageTransformer";
import Link from "react-router-dom/es/Link";

export default class RemoveFromWishlistBtn extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <Link to='/wishlist/' href='/wishlist/'>
                <figure>
                    <img
                        src="/src/assets/images/remove_wishlist-icon.png"
                        onClick={() => this.handleClick(this.props.book)}
                    />
                </figure>
            </Link>

        );
    }

    handleClick(book) {
        removeBookFromLocalStorageWishlist(book);
    }
}