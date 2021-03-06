import React from 'react';
import './Navbar.scss';
import Link from "react-router-dom/es/Link";
import SearchBar from './SearchBar';
import BookCategoryBtn from "../../book-details/BookCategoryBtn";

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        /* this.state = {
             searchedTerm: '',
         };
 */
        this.bookSearch = this.bookSearch.bind(this);
        this.getBookCategory = this.getBookCategory.bind(this);
    }

    bookSearch(book) {
        /*this.setState({
            searchedTerm: book,
        });*/
        this.props.onSearchBook(book);
    }

    getBookCategory(category) {
        this.props.onBookCategory(category);
    }

    render() {
        return (
            <nav className="navbar">
                <div className="container">
                    <a href="/">
                        <img className="logo" src="/src/assets/images/logo.png"/>
                    </a>
                    <ul className="nav nav-right">
                        <li><Link to="/allBooks" href="/allBooks">AllBooks</Link></li>
                        <li><Link to="/wishlist" href="/wishlist">Wishlist</Link></li>
                        <BookCategoryBtn onBookCategory={this.getBookCategory}/>
                        <SearchBar onSearchTermChanged={this.bookSearch}/>
                    </ul>
                </div>
            </nav>
        );
    }
}