import React from 'react';
import './SearchBar.scss';
import {debounce} from 'throttle-debounce';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchedBook: ''
        };
        this.onInputTextChange = debounce(800, this.onInputTextChange);
    }

    render() {
        return (
            <input type="text" placeholder="Search by title.."
                   onChange={event => this.onInputTextChange(event.target.value)}
            />
        );
    }

    onInputTextChange(term) {
        this.setState({searchedTerm: term});
        console.log(term);
        this.props.onSearchTermChanged(term);
    }
}