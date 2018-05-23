import React from 'react';
import Modal from 'react-modal';
import RemoveFromWishlistBtn from "../wishlist/RemoveFromWishlistBtn";
import BookReadStatus from "./BookReadedStatus";
import Link from "react-router-dom/es/Link";
import AddToWishlistBtn from "../wishlist/AddToWishlistBtn";

const modalStyle = {
    content: {
        top: '20%',
        bottom: '10%',
        left: '20%',
        right: '20%',
        maxWidth: '60%',
        backgroundColor: 'rgba(63, 123, 145, 0.75)',
        border: 'none'
    }
};

export default class BookDetailsModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isRead: false,
            modalIsOpen: false,
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.onReadedStatusChanged = this.onReadedStatusChanged.bind(this);
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
    }

    afterOpenModal() {
        modalStyle.content.backgroundColor = 'rgba(63, 123, 145, 1)';
    }

    toggleModal() {
        const {isOpen} = this.state.modalIsOpen;
        this.setState({
            modalIsOpen: !isOpen
        });
    }

    onReadedStatusChanged(status) {
        this.setState({
            isRead: status
        });
    }

    render() {
        let categoryURL = '/category/' + this.props.book.category.toLowerCase();
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Add new book"
                ariaHideApp={false}
                style={modalStyle}
                shouldCloseOnOverlayClick={true}
                overlayClassName="ReactModal__Overlay"
            >
                <button className="close-button" onClick={this.closeModal}>x</button>
                <p className="titleAndAuthor">{this.props.book.title} - {this.props.book.author}</p>
                <img
                    className="bookCover--modal"
                    src={this.props.book.cover}/>
                <ul key={this.props.book.id}>
                    <li><b>ISBN:</b> {this.props.book.ISBN}

                        {this.props.fromWishlist ? (
                            <RemoveFromWishlistBtn book={this.props.book}/>
                        ) : (
                            <AddToWishlistBtn book={this.props.book}
                                              wishlistBooks={this.props.getWishlist}
                            />
                        )}
                        <BookReadStatus
                            readedStatus={this.props.book.readedStatus}
                            book={this.props.book}
                            onReadedStatusChanged={this.onReadedStatusChanged}
                        />
                    </li>
                    <li><b style={{fontSize: 20}}>Price: {this.props.book.price}</b></li>
                    <li><b>Category:</b>
                        <Link to={categoryURL}
                              href={categoryURL}
                        > {this.props.book.category}</Link>
                    </li>
                    <li><b>Details:</b> {this.props.book.details}</li>
                </ul>
            </Modal>
        );
    }
}

