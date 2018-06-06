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

    /*componentDidMount() {

        let localStorage = window.localStorage;

        let json = localStorage.getItem('loggedUser');

        if (json) {
            let user = JSON.parse(json);

            if (user.userUsername) {
                this.setState({
                    loggedUser: user.userUsername
                });
            }
        }
    }*/

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
                    <div>
                        <button
                            className="welcomeUser">
                            {this.props.username}
                        </button>
                        <button
                            className="welcomeUser"
                            onClick={this.handleLogout}>
                            Logout
                        </button>
                    </div>
                );
            }
            return null;
        }
        else {
            return null;
        }
    }
}