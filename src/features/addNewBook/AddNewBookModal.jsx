import React from 'react';
import './AddNewBook.scss';
import Modal from 'react-modal';
import {addToDB} from "../../helpers/jsonServerTransformer";

Modal.setAppElement(document.getElementById('root'));

const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 200,
        left: 300,
        right: 300,
        bottom: 100,
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
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
        this.convertBase64ToImage = this.convertBase64ToImage.bind(this);
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
        })
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
    }

    sendValues() {
        let book = {};

        book.author = this.state.bookAuthor;
        book.title = this.state.bookTitle;
        book.ISBN = this.state.bookISBN;
        book.price = this.state.bookPrice;
        book.category = this.state.bookCategory;
        book.details = this.state.bookDescription;
        book.readedStatus = false;
        book.id = 9;
        book.cover = this.state.bookCover;

        addToDB(book);

        this.setState({
            visible: false
        });
    }

    convertBase64ToImage(bookCoverImage, title) {

        let base64Str = bookCoverImage;
        let path = '/src/assets/images/book-covers/';
        let optionalObj = {'fileName': title};
        base64ToImage(base64Str, path, optionalObj);
    }

    toggleModal(event) {
        console.log(event);
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
            console.log(fileContent);

            this.setState({
                bookCover: fileContent,
            })

        };
    }

    render() {
        return (
            <div>
                <button onClick={this.toggleModal}>Add new Book</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Add new book"
                    ariaHideApp={false}
                    style={modalStyle}
                >
                    <form>
                        <label>Title
                            <input
                                name="bookTitle"
                                type="text"
                                onChange={this.handleInputChange}/>
                        </label>
                        <br/> <br/>
                        <label>Author
                            <input
                                name="bookAuthor"
                                type="text"
                                onChange={this.handleInputChange}/>
                        </label>
                        <br/> <br/>
                        <label>ISBN
                            <input
                                name="bookISBN"
                                type="text"
                                onChange={this.handleInputChange}/>
                        </label>
                        <br/> <br/>
                        <label>Price
                            <input
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
                        <textarea name="bookDescription"
                                  rows="10" cols="90" onClick={this.handleInputChange}
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
                        <img src={this.state.bookCover}/>
                        <br/> <br/>
                        <input type="submit" value="Submit" onClick={this.sendValues}/>
                    </form>
                </Modal>
            </div>
        );
    }
}


