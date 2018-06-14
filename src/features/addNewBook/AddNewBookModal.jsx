import React from 'react';
import './AddNewBook.scss';
import Modal from 'react-modal';
import {addToDB} from "../../helpers/jsonServerTransformer";
import ErrorMessage from "./ErrorMessage";
import WishlistModel from "../../services/WishlistModel";
import WishlistCollection from "../../services/WishlistCollection";
import BooksCollection from "../../services/BooksCollection";

Modal.setAppElement(document.getElementById('root'));

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(63, 123, 145, 1)',
    }
};

export default class AddNewBook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bookTitle: '',
            bookAuthor: '',
            bookISBN: '',
            bookPrice: '',
            bookCategory: '',
            bookDescription: '',
            modalIsOpen: false,
            bookCover: '',

            bookAuthorError: false,
            bookTitleError: false,
            bookDescriptionError: false,
            bookPriceError: false,
            bookISBNError: false,
            bookCategoryError: false,
            bookCoverError: true,

            sendValuesPressed: false,

            userLogged: null,
            allBooksFromDB: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendValues = this.sendValues.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp, false);

        let localStorage = window.localStorage;

        let json = localStorage.getItem('loggedUser');

        if (json) {
            let user = JSON.parse(json);
            this.setState({
                userLogged: user
            })
        }

        let booksCollection = new BooksCollection();

        booksCollection.getAllBooks().then((res) => {
            this.setState({
                allBooksFromDB: res
            })
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyUp, false);
    }

    handleKeyUp(e) {
        const keys = {
            27: () => {
                e.preventDefault();
                this.closeModal();
                window.removeEventListener('keyup', this.handleKeyUp, false);
            },
        };

        if (keys[e.keyCode]) {
            keys[e.keyCode]();
        }
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal(book) {
        this.setState({
            modalIsOpen: false
        });


        this.props.styleOnModalOpened('');
        if (!this.formValidation()) {
            this.props.wasAddedNewBookStatus('');
        }
        else {
            console.log('Book this.formValidation(): ', book);
            this.props.wasAddedNewBookStatus(book);
        }

        this.setState({
            bookAuthor: '',
            bookISBN: '',
            bookPrice: '',
            bookCategory: '',
            bookDescription: '',
            bookCover: '',
            bookTitle: '',
            bookAuthorError: false,
            bookTitleError: false,
            bookDescriptionError: false,
            bookPriceError: false,
            bookISBNError: false,
            bookCategoryError: false,
            bookCoverError: true
        });
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (this.state.sendValuesPressed)
            this.formValidation();
    }


    afterOpenModal() {
        this.props.styleOnModalOpened('allCards blur');
    }

    sendValues(e) {

        e.preventDefault();

        let book = {};
        let lastBookId = this.props.allBooks[this.props.allBooks.length - 1].id;

        book.author = this.state.bookAuthor;
        book.title = this.state.bookTitle;
        book.ISBN = this.state.bookISBN;
        book.price = this.state.bookPrice;
        book.category = this.state.bookCategory;
        book.details = this.state.bookDescription;
        book.readedStatus = false;
        book.id = lastBookId + 1;
        book.cover = this.state.bookCover;

        this.setState({
            sendValuesPressed: true
        });


        let wishlist = {};
        wishlist.id = book.id;
        wishlist.users = [];

        let wishlistModel = new WishlistModel(wishlist);

        debugger;
        let wishlistCollection = new WishlistCollection();

        let self = this;
        // TODO add the book also to the wishlist
        // TODO at resolve, axios, put eject
        if (this.formValidation() && book.title) {
            addToDB(book).then((res) => {
                this.closeModal(book);
            });
            wishlistCollection.addNewBookToWishlistDB(book.id, this.state.userLogged.userUsername);
        }
    }


    toggleModal(event) {

        const {isOpen} = this.state.modalIsOpen;
        this.setState({
            modalIsOpen: !isOpen
        });
    }

    onImageUpload(image) {
        let reader = new FileReader();
        reader.readAsDataURL(image.target.files[0]);

        reader.onload = () => {
            let fileContent = reader.result;
            this.setState({
                bookCover: fileContent,
                bookCoverError: false
            });
        };

    }

    formValidation() {
        // TODO check double negation
        this.setState({
            bookAuthorError: this.state.bookAuthor ? false : true,
            bookTitleError: this.state.bookTitle ? false : true,
            bookDescriptionError: this.state.bookDescription ? false : true,
            bookISBNError: (this.state.bookISBN.match("^[0-9-]*$") && this.state.bookISBN.length >= 10) ? false : true,
            bookPriceError: this.state.bookPrice ? false : true,
            bookCategoryError: this.state.bookCategory ? false : true,
        });


        console.log('bookAuthorError: ', this.state.bookAuthorError);
        console.log('bookTitleE: ', this.state.bookTitleError);
        console.log('bookDescrError: ', this.state.bookDescriptionError);
        console.log('bookISBNError: ', this.state.bookISBNError);
        console.log('bookPriceError: ', this.state.bookPriceError);
        console.log('bookCategoryError: ', this.state.bookCategoryError);
        console.log('bookCoverError: ', this.state.bookCoverError);

        let stateObj = [this.state.bookTitleError, this.state.bookAuthorError, this.state.bookDescriptionError,
            this.state.bookISBNError, this.state.bookPriceError, this.state.bookCoverError, this.state.bookCategoryError];

        // TODO array method except map

        return stateObj.every((aux) => {
            return aux === false;
        });
    }

    render() {

        return (
            <div>
                <button
                    className="addNewBook__btn"
                    onClick={this.toggleModal}>Add new Book
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Add new book"
                    ariaHideApp={false}
                    style={modalStyle}
                    overlayClassName="ReactModal__Overlay"
                >
                    <button className="close-button" onClick={this.closeModal}>x</button>
                    <form
                        className="form__addNewBook">
                        <label>Title
                            <input
                                className="addNewBook__textInput"
                                name="bookTitle"
                                ref="bookTitle"
                                type="text"
                                onChange={this.handleInputChange}
                                value={this.state.bookTitle}
                                required
                            />
                            <ErrorMessage
                                isError={this.state.bookTitleError}
                                message=" Please insert the book title"/>
                        </label>
                        <br/> <br/>
                        <label>Author
                            <input
                                className="addNewBook__textInput"
                                name="bookAuthor"
                                type="text"
                                ref="bookAuthor"
                                onChange={this.handleInputChange}
                                required/>
                            <ErrorMessage
                                isError={this.state.bookAuthorError}
                                message=" Please insert the book author"/>
                        </label>
                        <br/> <br/>
                        <label>ISBN
                            <input
                                className='addNewBook__textInput'
                                name="bookISBN"
                                ref="bookISBN"
                                type="text"
                                onChange={this.handleInputChange}
                                data-fv-isbn={true}
                                required/>
                            <ErrorMessage
                                isError={this.state.bookISBNError}
                                message=" Please insert the book ISBN"/>
                        </label>
                        <br/> <br/>
                        <label>Price
                            <input
                                className='addNewBook__NumberInput'
                                name="bookPrice"
                                ref="bookPrice"
                                type="number"
                                onChange={this.handleInputChange}
                                required={true}/>
                            <ErrorMessage
                                isError={this.state.bookPriceError}
                                message=" Please insert the book price"/>
                        </label>
                        <br/> <br/>
                        <label>Category
                            <select value={this.state.bookCategory} onChange={this.handleInputChange}
                                    name="bookCategory"
                                    required={true}
                            >
                                <option value="placeholder" hidden={true}>Select a category</option>
                                <option value="Afaceri">Afaceri</option>
                                <option value="Beletristica">Beletristica</option>
                                <option value="Dictionare">Dictionare</option>
                                <option value="Biografii">Biografii</option>
                            </select>
                            <ErrorMessage
                                isError={this.state.bookCategoryError}
                                message=" Please insert the book category"/>
                        </label>
                        <br/> <br/>
                        <textarea
                            className='addNewBook__Textarea'
                            name="bookDescription"
                            rows="10" cols="90"
                            onChange={this.handleInputChange}
                            placeholder="Book description"
                            required={true}>
                    </textarea>
                        <ErrorMessage
                            isError={this.state.bookDescriptionError}
                            message=" Please insert the book description"/>
                        <br/> <br/>
                        <input
                            ref="file"
                            type="file"
                            name="bookCover"
                            multiple="false"
                            onChange={this.onImageUpload}
                            required={true}
                        />
                        <ErrorMessage
                            isError={this.state.bookCoverError}
                            message=" Please insert the book cover"/>
                        <br/> <br/>
                        <input
                            type="submit"
                            value="Submit"
                            onClick={this.sendValues}
                        />
                    </form>
                </Modal>
            </div>
        );
    }
}



