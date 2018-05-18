import React from 'react';
import './Navbar.scss';
import Link from "react-router-dom/es/Link";
import SearchBar from './SearchBar';
import BookCategoryBtn from "../../book-details/BookCategoryBtn";
import AddNewBook from "../../addNewBook/AddNewBookModal";


export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.bookSearch = this.bookSearch.bind(this);
        this.getBookCategory = this.getBookCategory.bind(this);
        // this.getNewBook = this.getNewBook.bind(this);
    }

    bookSearch(book) {
        this.props.onSearchBook(book);
    }

    getBookCategory(category) {
        this.props.onBookCategory(category);
    }

    render() {
        return (
            <header>
                <nav className="nav">
                    <h2>Navbar</h2>
                    {/* <a href="/">
                        <img className="logo" src="/src/assets/images/logo.png"/>
                    </a>*/}
                    <ul className="nav__ul">
                        <li className="nav__li"><Link to="/allBooks" href="/allBooks">AllBooks</Link></li>
                        <li className="nav__li"><Link to="/wishlist" href="/wishlist">Wishlist</Link></li>
                        <li className="nav__li"><BookCategoryBtn onBookCategory={this.getBookCategory}/></li>
                        <li className="nav__li"><AddNewBook/></li>
                        <SearchBar onSearchTermChanged={this.bookSearch}/>
                    </ul>
                </nav>
            </header>
        );
    }
}