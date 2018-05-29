import React from 'react';
import './AddNewBook.scss';
import Modal from 'react-modal';
import {addToDB} from "../../helpers/jsonServerTransformer";

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
            bookCoverError: false
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
        })
    }

    closeModal(book) {
        this.setState({
            modalIsOpen: false
        });

        this.props.styleOnModalOpened('');
        if (!this.formValidation())
            this.props.wasAddedNewBookStatus('');
        else
            this.props.wasAddedNewBookStatus(book);

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
            bookCoverError: false
        })
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        //this.formValidation();

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

        if (this.formValidation()) {
            addToDB(book).then((res) => {
                console.log('something', res);
                this.closeModal(book);
            });
        }
    }


    toggleModal(event) {

        const {isOpen} = this.state.modalIsOpen;
        this.setState({
            modalIsOpen: !isOpen
        })
    }

    onImageUpload(image) {

        let title = image.target.files[0].name;

        console.log('Image title: ', title);

        let reader = new FileReader();
        reader.readAsDataURL(image.target.files[0]);

        reader.onload = () => {
            let fileContent = reader.result;
            this.setState({
                bookCover: fileContent,
                bookCoverError: false
            })
        };

    }

    formValidation() {
        let isValid = true;

        if (this.state.bookAuthor.length < 1 || this.state.bookAuthor === '') {
            this.setState({
                bookAuthorError: true
            });
            isValid = isValid && false;
        } else {
            this.setState({
                bookAuthorError: false
            });
            isValid = isValid && true;
        }

        if (this.state.bookTitle.length < 1 || this.state.bookTitle === '') {
            this.setState({
                bookTitleError: true
            });
            isValid = isValid && false;
        } else {
            this.setState({
                bookTitleError: false
            });
            isValid = isValid && true;
        }

        if (this.state.bookDescription.length < 1 || this.state.bookDescription === '') {
            this.setState({
                bookDescriptionError: true
            });
            isValid = isValid && false;
        } else {
            this.setState({
                bookDescriptionError: false
            });
            isValid = isValid && true;
        }

        if (this.state.bookISBN.match("^[0-9-]*$") !== null && this.state.bookISBN.length >= 10 && this.state.bookISBN !== '') {
            this.setState({
                bookISBNError: false
            });
            isValid = isValid && false;
        } else {
            this.setState({
                bookISBNError: true
            });
            isValid = isValid && true;
        }

        if (this.state.bookPrice.length < 1 || this.state.bookPrice === '') {
            this.setState({
                bookPriceError: true
            });
            isValid = isValid && false;
        } else {
            this.setState({
                bookPriceError: false
            });
            isValid = isValid && true;
        }

        if (this.state.bookCategory === '') {
            console.log('error');
            this.setState({
                bookCategoryError: true
            });
            isValid = isValid && false;
        } else {
            console.log('no error');
            this.setState({
                bookCategoryError: false
            });
            isValid = isValid && true;
        }

        if (this.state.bookCover.length < 1 || this.state.bookCover === '') {
            this.setState({
                bookCoverError: true
            });
            isValid = isValid && false;
        } else {
            this.setState({
                bookCoverError: false
            });
            isValid = isValid && true;
        }
        return isValid;
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
                            {this.state.bookTitleError ? <ErrorMessage/> : null}
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
                            {this.state.bookAuthorError ? <ErrorMessage/> : null}
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
                            {this.state.bookISBNError ? <div style={{color: 'red', fontSize: 12}}>
                                {this.state.bookISBN ? 'Please enter a valid ISBN' : 'Requiered Field'}
                            </div> : null}
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
                            {this.state.bookPriceError ? <ErrorMessage/> : null}
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
                            {this.state.bookCategoryError ? <ErrorMessage/> : null}
                        </label>
                        <br/> <br/>
                        <textarea
                            className='addNewBook__Textarea'
                            name="bookDescription"
                            rows="10" cols="90" onChange={this.handleInputChange}
                            placeholder="Book description"
                            required={true}>
                            {this.state.bookDescriptionError ? <ErrorMessage/> : null}
                    </textarea>
                        <br/> <br/>
                        <input
                            ref="file"
                            type="file"
                            name="bookCover"
                            multiple="false"
                            onChange={this.onImageUpload}
                            required={true}
                        />
                        {this.state.bookCoverError ? <ErrorMessage/> : null}
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


const ErrorMessage = () => (
    <div style={{color: 'red', fontSize: 12}}>
        Requiered field!
    </div>
);


