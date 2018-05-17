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

   /* getNewBook(book) {
        console.log('The new book received: ', book);

        addToDB(book);
        //this.props.onNewBook(book);
    }*/

    render() {
        return (
            <header>
                <nav className="navbar">
                    <h2>Navbar</h2>
                    <a href="/">
                        <img className="logo" src="/src/assets/images/logo.png"/>
                    </a>
                    <ul className="nav">
                        <li><Link to="/allBooks" href="/allBooks">AllBooks</Link></li>
                        <li><Link to="/wishlist" href="/wishlist">Wishlist</Link></li>
                        <BookCategoryBtn onBookCategory={this.getBookCategory}/>
                        <li><AddNewBook/></li>
                        <SearchBar onSearchTermChanged={this.bookSearch}/>
                    </ul>
                </nav>
            </header>
        );
    }
}