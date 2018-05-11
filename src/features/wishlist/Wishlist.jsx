import React from 'react';
import {getWishlistFromLocalStorage} from "../../helpers/localStorageTransformer";
import Bookshelf from "../bookshelf/Bookshelf";

export default class Wishlist extends React.Component {

    constructor(props) {
        super(props);

        this.getLocalStorage = this.getLocalStorage.bind(this);
    }

    getLocalStorage() {
        let books = getWishlistFromLocalStorage();
        console.log('Books -> ', books);
    }

    render() {
        return (
            <div>
                {this.getLocalStorage()}
                {getWishlistFromLocalStorage() ? (
                    <Bookshelf
                        books={getWishlistFromLocalStorage()}
                        fromWishlist={true}
                    />
                ) : (
                    <h1>No books in wishlist..</h1>
                )}
            </div>
        );
    }
}