import React from 'react';
import Link from "react-router-dom/es/Link";
import BooksCollection from "../../services/BooksCollection";

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
            this.setState({
                isUserLogged: localStorage.getItem('loggedUser')
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
        let booksCollection = new BooksCollection();
        booksCollection.removeBookFromWishlist(book);
        this.props.bookRemovedFromWishlist(book);
    }
}