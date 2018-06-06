import React from 'react';
import ErrorMessage from "../addNewBook/ErrorMessage";
import UsersCollection from "../../services/UsersCollection";
import {addLoggedUserToLocalStorage} from "../../helpers/localStorageTransformer";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            validUser: null
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        let md5 = require('md5');
        let sha512 = require('js-sha512');

        let encryptedPassword = sha512.hmac(md5(this.state.password), this.state.password);

        let usersCollection = new UsersCollection();

        usersCollection.getUserByUsername(this.state.username).then((res) => {
            if (res.length) {
                if (encryptedPassword === res[0].password) {
                    addLoggedUserToLocalStorage(res[0]);
                    this.props.loginSuccess(true);
                    this.setState({
                        validUser: res[0]
                    });
                } else {
                    this.props.loginSuccess(false);
                    this.setState({
                        validUser: null
                    })
                }
            } else {
                this.props.loginSuccess(false);
                this.setState({
                    validUser: null
                })
            }
        });
    }


    render() {
        return (
            <form className="form__signUpUser">
                <label>Username
                    <input
                        className="signUpUser__textInput"
                        name="username"
                        ref="username"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.username}
                        required
                    />
                    <ErrorMessage
                        isError={this.state.usernameError}
                        message="Please insert your username"
                    />
                </label>
                <label>Password
                    <input
                        className="signUpUser__textInput"
                        name="password"
                        ref="password"
                        type="password"
                        onChange={this.handleInputChange}
                        value={this.state.password}
                        required
                    />
                    <ErrorMessage
                        isError={this.state.passwordError}
                        message="Please insert a valid password ((Minimum eight characters, at least one letter and one number)"
                    />
                </label>
                <button
                    className="login-button"
                    onClick={this.handleLogin}
                >Login
                </button>
            </form>
        );
    }
}