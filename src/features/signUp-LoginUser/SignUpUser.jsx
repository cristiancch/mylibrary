import React from 'react';
import Modal from 'react-modal';
import './signUpUser.scss';
import UsersCollection from "../../services/UsersCollection";
import LoginForm from "./LoginForm";
import SignUpForm from "./SingUpForm";

Modal.setAppElement(document.getElementById('root'));

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: '60%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(63, 123, 145, 1)',
    }
};

export default class SignUpUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            sendValuesPressed: false,
            loginFormShow: false,

            // loginUsername: '',
            // loginPassword: ''

        };

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.registerUserInput = this.registerUserInput.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.login = this.login.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keyUp', this.handleKeyUp, false);
    }

    handleKeyUp(e) {
        const keys = {
            27: () => {
                e.preventDefault();
                this.closeModal();
                window.removeEventListener('keyup', this.handleKeyUp, false);
            },
        };

        if (keys[e.keyCode]) {
            keys[e.keyCode]();
        }
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal() {

        this.setState({
            modalIsOpen: false,
            loginFormShow: false
        });

        this.props.styleOnModalOpened('');

        this.setState({
            loginUsername: '',
            loginPassword: ''
        });
    }

    afterOpenModal() {
        this.props.styleOnModalOpened('allCards blur');
    }

    toggleModal(event) {
        const {isOpen} = this.state.modalIsOpen;
        this.setState({
            modalIsOpen: !isOpen
        })
    }

    registerUserInput(userModel) {
        let usersCollection = new UsersCollection();
        usersCollection.addUserToDB(userModel).then((res) => {
            this.closeModal();
        });
    }

    goToLogin(e) {
        e.target.style.display = 'none';
        this.setState({
            loginFormShow: true
        })
    }

    login(username, password) {
        this.setState({
            loginUsername: username,
            loginPassword: password
        });

        this.closeModal();
    }

    handleLoginSuccess(status) {
        console.log('In SignUpUser, status is', status, ';');
        if (status) {
            this.closeModal();
        }
        this.props.handleSuccessLogin(status);
    }

    render() {
        if (this.props.show){
            return (
                <div>
                    <button
                        className="signUpUser__btn"
                        onClick={this.toggleModal}
                    >SignUp/Login
                    </button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="SignUp/Login"
                        ariaHideApp={false}
                        style={modalStyle}
                        overlayClassName="ReactModal__Overlay"
                    >
                        <button className="close-button" onClick={this.closeModal}>x</button>
                        <button
                            className="login-button"
                            onClick={this.goToLogin}
                        >Login
                        </button>
                        {this.state.loginFormShow ? (
                            <LoginForm
                                loginSuccess={this.handleLoginSuccess}
                            />
                        ) : (
                            <SignUpForm
                                registerUser={this.registerUserInput}
                            />
                        )}
                    </Modal>
                </div>
            );
        }else{
            return null;
        }
    }
}