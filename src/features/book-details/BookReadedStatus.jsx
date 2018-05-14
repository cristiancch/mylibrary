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
                <figure>
                    <img
                        src="/src/assets/images/readed-icon.png"
                        onClick={() => this.handleReadedClick(this.props.book)}
                    />
                </figure>
            ) : (
                <figure>
                    <img
                        src="/src/assets/images/notReaded-icon.png"
                        onClick={() => this.handleNotReadedClick(this.props.book)}
                    />
                </figure>
            )
        );
    }

    handleReadedClick(book) {
        console.log('readed: ', book.readedStatus, ', param sent:, true');
        book.readedStatus = false;
        updateDB(book);
        this.props.onReadedStatusChanged(false);
    }

    handleNotReadedClick(book) {
        console.log('readed: ', book.readedStatus, ', param sent:, false');
        book.readedStatus = true;
        updateDB(book);
        this.props.onReadedStatusChanged(true);
    }
}