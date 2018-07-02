import React from 'react';
import {removeLoggedUserFromLocalStorage} from "../../../helpers/localStorageTransformer";

export default class WelcomeUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isUserLogedOut: false
        };

        this.handleLogout = this.handleLogout.bind(this);
    }


    handleLogout() {
        removeLoggedUserFromLocalStorage();
        this.setState({
            isUserLogedOut: true
        });
        this.props.onLogout(true);
    }

    render() {
        if (!this.props.show) {
            if (this.props.username) {
                return (
                    <ul className="nav__ul">
                        <li className="nav__li">
                            <button
                                className="welcomeUser">
                                {this.props.username}
                            </button>
                        </li>
                        <li className="nav__li">
                            <button
                                className="user__logout"
                                onClick={this.handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                );
            }
            return null;
        }
        else {
            return null;
        }
    }
}