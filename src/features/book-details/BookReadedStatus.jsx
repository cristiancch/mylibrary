import React from 'react';
import {updateDB} from "../../helpers/jsonServerTransformer";

export default class BookReadedStatus extends React.Component {


    constructor(props) {
        super(props);
        this.handleReadedClick = this.handleReadedClick.bind(this);
        this.handleNotReadedClick = this.handleNotReadedClick.bind(this);
    }

    render() {
        return (
            (this.props.readedStatus) ? (
                <img
                    className="readedStatus__button"
                    src="/src/assets/images/readed-icon.png"
                    onClick={() => this.handleReadedClick(this.props.book)}
                />
            ) : (
                <img
                    className="readedStatus__button"
                    src="/src/assets/images/notReaded-icon.png"
                    onClick={() => this.handleNotReadedClick(this.props.book)}
                />
            )
        );
    }

    handleReadedClick(book) {
        book.readedStatus = false;
        updateDB(book);
        this.props.onReadedStatusChanged(false);
    }

    handleNotReadedClick(book) {
        book.readedStatus = true;
        updateDB(book);
        this.props.onReadedStatusChanged(true);
    }
}