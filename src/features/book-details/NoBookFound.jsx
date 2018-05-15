import React from 'react';
import Singleton from 'react-singleton';

class NoBookFound extends React.Component {

    render() {
        return (
            <div>
                <h1>No book found</h1>
            </div>
        );
    }
}

export default new Singleton(NoBookFound);