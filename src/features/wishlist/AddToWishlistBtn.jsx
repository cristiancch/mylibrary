import React from 'react';
import "./Wishlist.scss";
import BooksCollection from "../../services/BooksCollection";
import WishlistModel from "../../services/WishlistModel";
import WishlistCollection from "../../services/WishlistCollection";


export default class AddToWishlistBtn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isUserLogged: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let localStorage = window.localStorage;

        if (localStorage.getItem('loggedUser')) {
            let json = localStorage.getItem('loggedUser');
            let user = JSON.parse(json);
            this.setState({
                isUserLogged: user
            });
        }
    }

    handleClick(book) {

        /*
        //only for first time use
        book.bookUsers = [];

        let wishlist = {};

        wishlist.id = book.bookId;
        wishlist.users = [];

        let wishlistModel = new WishlistModel(wishlist);

        let booksCollection = new BooksCollection();

        booksCollection.addBookToWishlistDB(wishlistModel).then((res) => {
            console.log(res);
        });
        this.props.onBookAdded(book);*/

        console.log('Add book ', book.bookId, ' assigned to user ', this.state.isUserLogged.userUsername);

        let wishlistCollection = new WishlistCollection();

        wishlistCollection.addBookToWishlistDB(book.bookId, this.state.isUserLogged.userUsername)
        this.props.onBookAdded(book);
    }

    render() {
        if (this.state.isUserLogged)
            return (
                <img
                    className="wishlist__button"
                    src="/src/assets/images/addTo_wishlist-icon.png"
                    onClick={() => this.handleClick(this.props.book)}
                />

            );
        else
            return null;
    }
}