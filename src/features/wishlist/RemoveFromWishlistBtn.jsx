import React from 'react';
import Link from "react-router-dom/es/Link";
import WishlistCollection from "../../services/WishlistCollection";

export default class RemoveFromWishlistBtn extends React.Component {

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

    render() {
        if (this.state.isUserLogged)
            return (
                <Link to='/wishlist/' href='/wishlist/'>
                    <img
                        src="/src/assets/images/remove_wishlist-icon.png"
                        className="wishlist__button"
                        onClick={() => this.handleClick(this.props.book)}
                    />
                </Link>
            );
        else return null;
    }

    handleClick(book) {
        console.log('book to be deleted: ', book);
        let wishlistCollection = new WishlistCollection();
        wishlistCollection.removeBookFromWishlist(book, this.state.isUserLogged);
        this.props.bookRemovedFromWishlist(book);
    }
}