import React from 'react';
import ErrorMessage from "../addNewBook/ErrorMessage";
import UserModel from "../../services/UserModel";

export default class SignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            passwordConfirmation: '',

            firstNameError: false,
            lastNameError: false,
            emailError: false,
            usernameError: false,
            passwordError: false,
            passwordConfirmationError: false,

            sendValuesPressed: false
        };

        this.handleSignUpInput = this.handleSignUpInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (this.state.sendValuesPressed)
            this.formValidation();
    }


    validatePassword(password, passwordConfirmation) {

        if (!password.length) {
            console.log('Password too short');
            return false;
        }
        else {
            if (password === passwordConfirmation) {
                let re = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
                //Minimum eight characters, at least one letter and one number
                return re.test(String(password));
            }
            return false;
        }
    }

    validateEmail(email) {
        if (email.length) {
            let re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return re.test(String(email).toLowerCase());
        }
        return false;
    }

    validateName(name) {

        if (name.length) {
            let re = new RegExp(/^[a-zA-Z ]+$/);
            return re.test(String(name));
        }
        return false;
    }

    formValidation() {

        this.setState({
            firstNameError: !this.validateName(this.state.firstName),
            lastNameError: !this.validateName(this.state.lastName),
            emailError: !this.validateEmail(this.state.email),
            usernameError: this.state.username ? false : true,
            passwordError: !this.validatePassword(this.state.password, this.state.passwordConfirmation),
            passwordConfirmationError: !this.validatePassword(this.state.password, this.state.passwordConfirmation)
        });

        let stateObj = [
            this.state.firstNameError, this.state.lastNameError, this.state.emailError,
            this.state.usernameError, this.state.passwordError, this.state.passwordConfirmationError
        ];

        return stateObj.every((aux) => {
            return aux === false
        });
    }

    handleSignUpInput(e) {

        e.preventDefault();

        let md5 = require('md5');
        let sha512 = require('js-sha512');

        let user = {};
        user.firstName = this.state.firstName;
        user.lastName = this.state.lastName;
        user.email = this.state.email;
        user.username = this.state.username;
        user.password = sha512.hmac(md5(this.state.password), this.state.password);

        this.setState({
            sendValuesPressed: true
        });

        if (this.formValidation() && this.state.firstName && this.state.lastName &&
            this.state.username && this.state.email && this.state.password && this.state.passwordConfirmation) {
            let userModel = new UserModel(user);
            this.props.registerUser(userModel);
        }

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            passwordConfirmation: '',

            firstNameError: false,
            lastNameError: false,
            emailError: false,
            usernameError: false,
            passwordError: false,
            passwordConfirmationError: false,
        });
    }

    render() {
        return (
            <form className="form__signUpUser">
                <label>First Name
                    <input
                        className="signUpUser__textInput"
                        name="firstName"
                        ref="firstName"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.firstName}
                        required
                    />
                    <ErrorMessage
                        isError={this.state.firstNameError}
                        message="Please insert your firstname"
                    />
                </label>
                <label>Last Name
                    <input
                        className="signUpUser__textInput"
                        name="lastName"
                        ref="lastName"
                        type="text"
                        onChange={this.handleInputChange}
                        value={this.state.lastName}
                        required
                    />
                    <ErrorMessage
                        isError={this.state.lastNameError}
                        message="Please insert your lastname"
                    />
                </label>
                <label>Email
                    <input
                        className="signUpUser__textInput"
                        name="email"
                        ref="email"
                        type="email"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                        required
                    />
                    <ErrorMessage
                        isError={this.state.emailError}
                        message="Please insert a valid email"
                    />
                </label>
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
                <label>Confirm Password
                    <input
                        className="signUpUser__textInput"
                        name="passwordConfirmation"
                        ref="passwordConfirmation"
                        type="password"
                        onChange={this.handleInputChange}
                        value={this.state.passwordConfirmation}
                        required
                    />
                    <ErrorMessage
                        isError={this.state.passwordConfirmationError}
                        message="Passwords should match"
                    />
                </label>
                <input
                    type="submit"
                    value="Create account"
                    className="createAccount-button"
                    onClick={this.handleSignUpInput}
                />
            </form>
        );
    }
}