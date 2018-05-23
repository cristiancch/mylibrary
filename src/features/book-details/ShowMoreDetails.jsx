import React from 'react';
import Popover from "react-simple-popover";

export default class ShowMoreDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    handleClick(e) {
        this.setState({
            open: !this.state.open,
        });
        console.log('this.refs.target: ', this.refs.target);
    }

    handleClose(e) {
        this.setState({
            open: false
        });

    }

    render() {
        return (
            <section>
                <h1 style={{display: 'none'}}>Boook description section</h1>
                {this.props.book.details.substr(0, 100) + '..   '}
                <a
                    href={'#!'}
                    ref="target"
                    style={{fontSize: '12px'}}
                    onClick={this.handleClick}
                >Show more..</a>
                <Popover
                    placement='right'
                    target={this.refs.target}
                    show={this.state.open}
                    onHide={this.handleClose}>
                    <p>{this.props.book.details}</p>
                </Popover>
            </section>
        );
    }
}