import React from 'react';
import './Bookshelf.scss';
import BookDetails from "../book-details/BookDetails";

export default class Bookshelf extends React.Component {

    render() {

        let books = this.props.books;

        /*let o = {};

        Object.defineProperty(o, 'a', {
            value: 37,
            writable: true,
            enumerable: true,
            configurable: true
        });

        let bValue = 38;

        Object.defineProperty(o, 'b', {
            get() {
                return bValue;
            },
            set(newValue) {
                bValue = newValue;
            },
            enumerable: true,
            configurable: true
        });

        console.log('o: ', o.b);
        o.b = 40;
        console.log('new o: ', o.b);
        console.log('bValue: ', bValue);*/


        /*function closureExample() {
            let name = 'Mozilla';

            function displayName() {
                alert(name);
            }

            return displayName;
        }

        let myFunc = closureExample();
        myFunc();*/

        /*let counter = (function () {
            let privateCounter = 0;

            function changeBy(value) {
                privateCounter += value;
            }

            return {
                increment: function () {
                    changeBy(1);
                },
                decrement: function () {
                    changeBy(-1);
                },
                value: function () {
                    return privateCounter;
                },
                incrementBy: function (x) {
                    changeBy(x);
                }
            }

        })();

        console.log(counter.value());
        counter.increment();
        counter.increment();
        console.log('counterValue after increment and decrement: ', counter.value());
        counter.decrement();
        console.log('counterValue after decrement: ', counter.value());
        counter.incrementBy(10);
        console.log('counterValue after increment by 10: ', counter.value());*/

        
        return (
            <nav className="allCards">
                <h2>All cards</h2>
                {books.map((book, index) =>
                    (this.props.category) ? (
                        (this.props.category.toLowerCase() === book.category.toLowerCase()) ? (
                            <BookDetails
                                books={books}
                                id={book.id}
                                toSearch={this.props.bookToSearch}
                                key={index}
                                fromBookshelf={true}
                                fromWishlist={this.props.fromWishlist}
                            />
                        ) : (null)
                    ) : (
                        <BookDetails
                            books={books}
                            id={book.id}
                            toSearch={this.props.bookToSearch}
                            key={index}
                            fromBookshelf={true}
                            fromWishlist={this.props.fromWishlist}
                        />
                    )
                )}
            </nav>
        );
    }
}