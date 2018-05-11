import React, {Component} from 'react';
import Footer from 'features/navigation/footer/Footer';
import Navbar from 'features/navigation/navbar/Navbar';
import BookDetails from 'features/book-details/BookDetails';
import axios from "axios/index";
import Switch from "react-router-dom/es/Switch";
import Bookshelf from "./features/bookshelf/Bookshelf";
import Wishlist from "./features/wishlist/Wishlist";
import Route from "react-router-dom/es/Route";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            routeId: 0,
            bookToBeSearched: '',
            wishlist: [],
            category: ''
        };

        this.searchBook = this.searchBook.bind(this);
        //this.getWishlist = this.getWishlist.bind(this);
        this.getBookCategory = this.getBookCategory.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/books')
            .then(res => {
                this.setState({books: res.data});
            });
    }

    render() {
        return (
            <div>
                <Navbar
                    onSearchBook={this.searchBook}
                    onBookCategory={this.getBookCategory}
                />
                <div>
                    <Switch>
                        <Route exact path="/"
                               render={(props) =>
                                   <Bookshelf
                                       {...props} books={this.state.books}
                                       bookToSearch={this.state.bookToBeSearched}
                                       category={''}
                                   />}
                        />
                        <Route path='/allBooks'
                               render={(props) =>
                                   <Bookshelf
                                       {...props}
                                       /*books={getReadedBooksFromLocalStorage() ? (
                                           getReadedBooksFromLocalStorage()
                                       ) : (this.state.books)}*/
                                       books={this.state.books}
                                       bookToSearch={this.state.bookToBeSearched}
                                       /* category={this.state.category}*/
                                   />}
                        />
                        <Route path='/category/:id'
                               render={(props) =>
                                   <Bookshelf
                                       {...props}
                                       // books={getReadedBooksFromLocalStorage()}
                                       books={this.state.books}
                                       category={props.match.params.id}
                                       /* category={this.state.category}*/
                                   />}
                        />
                        <Route path='/bookDetail/:id'
                               render={(props) =>
                                   <BookDetails
                                       {...props}
                                       books={this.state.books}
                                       id={props.match.params.id}
                                       toSearch={this.state.bookToBeSearched}
                                       //onReceiveBooks={this.getWishlist}
                                   />}
                        />
                        <Route path='/wishlist'
                               render={(props) =>
                                   <Wishlist
                                       {...props}
                                       wishlist={this.state.wishlist}
                                   />
                               }
                        />
                    </Switch>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    }

    /*getWishlist(books) {
        this.setState(previousState => ({
            wishlist: [...previousState.wishlist, books]
        }));

        console.log('Books received in App, size is ', this.state.wishlist.length);
    }*/

    searchBook(book) {
        this.setState({
            bookToBeSearched: book
        });
        console.log('In App, the book searched is ', this.state.bookToBeSearched);
    }

    getBookCategory(category) {
        this.setState({
            category: category
        });
    }

}
