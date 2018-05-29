import React from 'react';
import './Bookshelf.scss';
import BookDetails from "../book-details/BookDetails";

export default class Bookshelf extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            wasAddedNewBook: true
        };

        //  this.onNewBookStatus = this.onNewBookStatus.bind(this);
    }

    /*onNewBookStatus() {
        console.log('status received: ');
        let newStatus = !this.state.wasAddedNewBook;

        this.setState({
            wasAddedNewBook: newStatus
        })
    }*/

    /*componentDidUpdate() {

        if (this.props.wasAddedNewBookStatus !== this.state.wasAddedNewBook)
            this.setState({
                wasAddedNewBook: this.props.wasAddedNewBookStatus
            })
    }*/

    /* componentWillReceiveProps(nextProps) {

         console.log('component will receive props, nextProps: ', nextProps.wasAddedNewBookStatus, ', ' +
             'current props: ', this.props.wasAddedNewBookStatus);

         console.log('Old state: ', this.state.wasAddedNewBook);

         if (this.state.wasAddedNewBook !== this.props.wasAddedNewBookStatus) {
             let newStatus = !this.state.wasAddedNewBook;
             this.setState({wasAddedNewBook: newStatus});
         }

         console.log('New state: ', this.state.wasAddedNewBook);
     }*/


    /*static getDerivedStateFromProps(nextProps, prevState) {
        // do things with nextProps.someProp and prevState.cachedSomeProp

        console.log('-----------------------');
        console.log('prevState: ', prevState.wasAddedNewBook);
        console.log('getDerivedStateFromProps', nextProps.wasAddedNewBookStatus);
        //console.log('state: ', this.state.wasAddedNewBook);

        return {
            wasAddedNewBook: nextProps.wasAddedNewBookStatus
        };
    }*/

    /*shouldComponentUpdate() {

        console.log('state: ', this.state.wasAddedNewBook);
        console.log('props: ', this.props.wasAddedNewBookStatus);
        console.log('Should component update? ', this.state.wasAddedNewBook !== this.props.wasAddedNewBookStatus);

        return this.state.wasAddedNewBook !== this.props.wasAddedNewBookStatus;
    }*/


    render() {

        let books = {};
        let ids = [];

        if (this.props.category) {
            ids = this.props.books.filter(book => {
                if (this.props.category.toLowerCase() === book.category.toLowerCase()) {
                    console.log('book.id: ', book.id);
                    return book.id;
                }
            })
        }
        else {
            if (this.props.books)
                ids = this.props.books.map(book => {
                    return book.id;
                })
        }

        books = this.props.books;


        if (this.props.allBooks)
            if (this.props.allBooks.length) {
                books = this.props.allBooks;
            }

        if (this.props.booksIds) {
            ids = this.props.booksIds;
        }

        return (
            <nav className="allCards">
                <h2>AllCards</h2>
                {ids.map((id, index) =>
                    <BookDetails
                        books={books}
                        id={id}
                        toSearch={this.props.bookToSearch}
                        key={index}
                        fromBookshelf={true}
                        fromWishlist={this.props.fromWishlist}
                    />
                )}
            </nav>
        )
    }
}