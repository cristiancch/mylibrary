import React from 'react';
import {getWishlistFromLocalStorage} from "../../helpers/localStorageTransformer";
import Bookshelf from "../bookshelf/Bookshelf";

export default class Wishlist extends React.Component {

    render() {
        return (
            <nav>
                <h2>All cards from wishlist</h2>
                {getWishlistFromLocalStorage() ? (
                    <Bookshelf
                        books={getWishlistFromLocalStorage()}
                        fromWishlist={true}
                    />
                ) : (
                    <h1>No books in wishlist..</h1>
                )}
            </nav>
        );
    }
}