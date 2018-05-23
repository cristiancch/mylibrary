import React from 'react';
import './AddNewBook.scss';
import Modal from 'react-modal';
import {addToDB, getDB, getPlaceholderBookCover} from "../../helpers/jsonServerTransformer";

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
            bookCover: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendValues = this.sendValues.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
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

    closeModal() {
        this.setState({
            modalIsOpen: false
        });

        this.props.styleOnModalOpened('');
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    afterOpenModal() {
        this.props.styleOnModalOpened('allCards blur');
    }

    sendValues(e) {

        e.preventDefault();

        let book = {};
        let lastBookId = this.props.allBooks[this.props.allBooks.length - 1].id;

        //TODO do not refresh page on submit
        //TODO find a way not to show query string into the URL -- done
        //TODO show newly added book in the list without refreshing the page after DB insert --done

        book.author = this.state.bookAuthor;
        book.title = this.state.bookTitle;
        book.ISBN = this.state.bookISBN;
        book.price = this.state.bookPrice;
        if (this.state.category) {
            book.category = this.state.bookCategory;
        } else {
            book.category = 'Afaceri';
        }
        book.details = this.state.bookDescription;
        book.readedStatus = false;
        book.id = lastBookId + 1;

        if (this.state.bookCover) {
            book.cover = this.state.bookCover;
        } else {
            book.cover = getPlaceholderBookCover();
        }

        console.log('Book description: ', book.details);

        addToDB(book);

        // TODO .then to go to bookshelf without page reloading or history, using promises

        this.closeModal();

        //this.props.history.push('/');

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
            })

        };
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
                    <form className="form__addNewBook">
                        <label>Title
                            <input
                                className="addNewBook__textInput"
                                name="bookTitle"
                                type="text"
                                onChange={this.handleInputChange}/>
                        </label>
                        <br/> <br/>
                        <label>Author
                            <input
                                className="addNewBook__textInput"
                                name="bookAuthor"
                                type="text"
                                onChange={this.handleInputChange}/>
                        </label>
                        <br/> <br/>
                        <label>ISBN
                            <input
                                className="addNewBook__textInput"
                                name="bookISBN"
                                type="text"
                                onChange={this.handleInputChange}/>
                        </label>
                        <br/> <br/>
                        <label>Price
                            <input
                                className="addNewBook__NumberInput"
                                name="bookPrice"
                                type="number"
                                onChange={this.handleInputChange}/>
                        </label>
                        <br/> <br/>
                        <label>Category
                            <select value={this.state.bookCategory} onChange={this.handleInputChange}
                                    name="bookCategory">
                                <option value="Afaceri">Afaceri</option>
                                <option value="Beletristica">Beletristica</option>
                                <option value="Dictionare">Dictionare</option>
                                <option value="Biografii">Biografii</option>
                            </select>
                        </label>
                        <br/> <br/>
                        <textarea
                            className="addNewBook__Textarea"
                            name="bookDescription"
                            rows="10" cols="90" onChange={this.handleInputChange}
                            placeholder="Book description">
                        </textarea>
                        <br/> <br/>
                        <input
                            ref="file"
                            type="file"
                            name="bookCover"
                            multiple="false"
                            onChange={this.onImageUpload}
                        />
                        <br/> <br/>
                        <input type="submit" value="Submit" onClick={this.sendValues}/>
                    </form>
                </Modal>
            </div>
        );
    }
}


