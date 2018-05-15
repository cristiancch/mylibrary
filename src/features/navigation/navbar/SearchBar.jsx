import React from 'react';
import {debounce} from 'throttle-debounce';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.onInputTextChange = debounce(200, this.onInputTextChange);
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