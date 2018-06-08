export default class UserModel {

    constructor(user) {
        this.userFirstname = user.firstName;
        this.userLastname = user.lastName;
        this.userEmail = user.email;
        this.userUsername = user.username;
        this.userPassword = user.password;
    }


    get firstname() {
        return this.userFirstname;
    }

    get lastname() {
        return this.userLastname;
    }

    get username() {
        return this.userUsername;
    }

    get email() {
        return this.userEmail;
    }

    get password() {
        return this.userPassword;
    }

    set firstname(firstname) {
        this.userFirstname = firstname;
    }

    set lastname(lastname) {
        this.userLastname = lastname;
    }

    set email(email) {
        this.userEmail = email;
    }

    set username(username) {
        this.userUsername = username;
    }

    set password(password) {
        this.userPassword = password;
    }

}