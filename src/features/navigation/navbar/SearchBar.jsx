import React from 'react';
import {debounce} from 'throttle-debounce';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.onInputTextChange = debounce(200, this.onInputTextChange);
    }

    render() {
        return (
            <input
                className="bookSearchBar"
                type="text" placeholder="&#x1F50E;"
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