import React from 'react';
import {modifyReadedStatus} from "../../helpers/localStorageTransformer";
import {updateDB} from "../../helpers/jsonServerTransformer";

export default class BookReadedStatus extends React.Component {


    constructor(props) {
        super(props);

        this.handleReadedClick = this.handleReadedClick.bind(this);
        this.handleNotReadedClick = this.handleNotReadedClick.bind(this);
    }

    render() {
        return (
            //in bookDetails add style for readedStatus_btn
            (this.props.readedStatus) ? (
                <img
                    className="readedStatus_btn"
                    src="/src/assets/images/readed-icon.png"
                    onClick={() => this.handleReadedClick(this.props.book)}
                />
            ) : (
                <img
                    className="readedStatus_btn"
                    src="/src/assets/images/notReaded-icon.png"
                    onClick={() => this.handleNotReadedClick(this.props.book)}
                />
            )
        );
    }

    handleReadedClick(book) {
        console.log('readed: ', book.readedStatus, ', param sent:, true');
        // modifyReadedStatus(book, false);
        book.readedStatus = false;
        updateDB(book);
        this.props.onReadedStatusChanged(false);
    }

    handleNotReadedClick(book) {
        console.log('readed: ', book.readedStatus, ', param sent:, false');
        //modifyReadedStatus(book, true);
        book.readedStatus = true;
        updateDB(book);
        this.props.onReadedStatusChanged(true);
    }
}