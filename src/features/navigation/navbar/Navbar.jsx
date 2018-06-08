import React from 'react';
import './Navbar.scss';
import Link from "react-router-dom/es/Link";
import SearchBar from './SearchBar';
import BookCategoryBtn from "../../book-details/BookCategoryBtn";
import AddNewBook from "../../addNewBook/AddNewBookModal";
import SignUpUser from "../../signUp-LoginUser/SignUpUser";
import WelcomeUser from "./WelcomeUser";

export default class Navbar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            loggedUser: '',
            displaySignUp: true,
        };

        this.bookSearch = this.bookSearch.bind(this);
        this.getBookCategory = this.getBookCategory.bind(this);
        this.onModalOpened = this.onModalOpened.bind(this);
        this.onWasAddedNewBook = this.onWasAddedNewBook.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {

        let localStorage = window.localStorage;

        let json = localStorage.getItem('loggedUser');

        if (json) {
            let user = JSON.parse(json);
            if (user.userUsername) {
                this.setState({
                    loggedUser: user.userLastname,
                    displaySignUp: false
                });
            }
        } else {
            this.setState({
                displaySignUp: true
            })
        }
    }

    bookSearch(book) {
        this.props.onSearchBook(book);
    }

    getBookCategory(category) {
        this.props.onBookCategory(category);
    }

    onModalOpened(status) {
        this.props.onStyleModalOpened(status);
    }

    onWasAddedNewBook(status) {
        this.props.wasAddedNewBookStatus(status);
    }

    onLogin(status) {
        console.log('In Navbar, status is', status, ';');

        if (status) {
            let localStorage = window.localStorage;

            let json = localStorage.getItem('loggedUser');

            if (json) {
                let user = JSON.parse(json);

                if (user.userUsername) {
                    console.log('username: ', user.userUsername);
                    this.setState({
                        loggedUser: user.userLastname,
                    });
                }
            }
        }
        this.setState({
            displaySignUp: false
        })
    }

    onLogout(status) {
        this.setState({
            displaySignUp: true
        })
    }

    render() {
        return (
            <header>
                <nav className="nav">
                    <h2>Navbar</h2>
                    <ul className="nav__ul">
                        <li className="nav__li"><Link to="/allBooks" href="/allBooks">AllBooks</Link></li>
                        <li className="nav__li"><Link to="/wishlist" href="/wishlist">Wishlist</Link></li>
                        <li className="nav__li"><BookCategoryBtn onBookCategory={this.getBookCategory}/></li>
                        <li className="nav__li">
                            <AddNewBook
                                styleOnModalOpened={this.onModalOpened}
                                allBooks={this.props.allBooks}
                                history={this.props.history}
                                wasAddedNewBookStatus={this.onWasAddedNewBook}
                            />
                        </li>
                        <li className="nav__li">
                            <SignUpUser
                                styleOnModalOpened={this.onModalOpened}
                                handleSuccessLogin={this.onLogin}
                                show={this.state.displaySignUp}
                            />
                        </li>
                        <WelcomeUser
                            onLogout={this.onLogout}
                            username={this.state.loggedUser}
                            show={this.state.displaySignUp}
                        />
                        <SearchBar onSearchTermChanged={this.bookSearch}/>
                    </ul>
                </nav>
            </header>
        );
    }
}