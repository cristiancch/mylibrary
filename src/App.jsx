import React, {Component} from 'react';
import Navbar from 'features/navigation/navbar/Navbar';
import BookDetails from 'features/book-details/BookDetails';
import axios from "axios/index";
import Switch from "react-router-dom/es/Switch";
import Bookshelf from "./features/bookshelf/Bookshelf";
import Wishlist from "./features/wishlist/Wishlist";
import Route from "react-router-dom/es/Route";
import createBrowserHistory from "history/es/createBrowserHistory";
import {getDB} from "./helpers/jsonServerTransformer";

const history = createBrowserHistory({
        basename: "/allBooks",
        forceRefresh: true,
    }
);

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            routeId: 0,
            bookToBeSearched: '',
            wishlist: [],
            category: '',
            bookAdded: [],
            addNewBookModalStatus: '',
        };

        this.searchBook = this.searchBook.bind(this);
        this.getBookCategory = this.getBookCategory.bind(this);
        this.onNewBookAdded = this.onNewBookAdded.bind(this);
        this.getAddBookModalStatus = this.getAddBookModalStatus.bind(this);
        this.updateAddedNewBookStatus = this.updateAddedNewBookStatus.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/books')
            .then(res => {
                this.setState({books: res.data});
            });
    }

    onNewBookAdded(book) {
        this.setState({
            bookAdded: book
        });
    }

    searchBook(book) {
        this.setState({
            bookToBeSearched: book
        });
    }

    getBookCategory(category) {
        this.setState({
            category: category
        });
    }

    getAddBookModalStatus(status) {
        this.setState({
            addNewBookModalStatus: status
        });
    }

    updateAddedNewBookStatus(book) {

        //TODO add received book in the books state
        //TODO form validation (at book cover to be mandatory to have an image, and at book category the same

        let booksAux = [...this.state.books];

        if (book)
            booksAux.push(book);

        this.setState({
            books: booksAux
        });

        /*
           axios.get('http://localhost:3000/books')
                   .then(res => {
                       this.setState({books: res.data});
                   });*/

        // this.refs.bookshelfComponent.onNewBookStatus();
    }


    render() {
        return (
            <section>
                <h1 style={{display: 'none'}}>Main content</h1>
                <Navbar
                    onSearchBook={this.searchBook}
                    onBookCategory={this.getBookCategory}
                    onStyleModalOpened={this.getAddBookModalStatus}
                    allBooks={this.state.books}
                    history={history}
                    wasAddedNewBookStatus={this.updateAddedNewBookStatus}
                />
                <div className="page__body">
                    <Switch>
                        <Route exact path="/"
                               render={(props) =>
                                   <Bookshelf
                                       {...props} books={this.state.books}
                                       bookToSearch={this.state.bookToBeSearched}
                                       category={''}
                                       addNewBookModalStatus={this.state.addNewBookModalStatus}
                                       history={history}
                                       wasAddedNewBookStatus={this.state.newBookWasAdded}
                                   />}
                        />
                        <Route path='/allBooks'
                               render={(props) =>
                                   <Bookshelf
                                       {...props}
                                       books={this.state.books}
                                       bookToSearch={this.state.bookToBeSearched}
                                       addNewBookModalStatus={this.state.addNewBookModalStatus}
                                       history={history}
                                       wasAddedNewBookStatus={this.state.newBookWasAdded}
                                   />}
                        />
                        <Route path='/category/:id'
                               render={(props) =>
                                   <Bookshelf
                                       {...props}
                                       books={this.state.books}
                                       category={props.match.params.id}
                                       addNewBookModalStatus={this.state.addNewBookModalStatus}
                                       history={history}
                                       wasAddedNewBookStatus={this.state.newBookWasAdded}
                                   />}
                        />
                        <Route path='/bookDetail/:id'
                               render={(props) =>
                                   <BookDetails
                                       {...props}
                                       books={this.state.books}
                                       id={props.match.params.id}
                                       toSearch={this.state.bookToBeSearched}
                                       history={history}
                                   />}
                        />
                        <Route path='/wishlist'
                               render={(props) =>
                                   <Wishlist
                                       {...props}
                                       wishlist={this.state.wishlist}
                                       history={history}
                                       allBooks={getDB()}
                                   />
                               }
                        />
                    </Switch>
                </div>
            </section>
        );
    }


}
