import axios from "axios/index";
import UserModel from "./UserModel";

export default class UsersCollection {

    constructor() {
        this.allUsers = []
    }

    addUserToDB(user) {
        return new Promise((resolve, reject) => {
            resolve(
                fetch('http://localhost:3000/users', {
                    "body": JSON.stringify(user),
                    "headers": {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    "method": "POST"
                })
            );
        }).then((res) => {
            console.log(res);
            return res;
        })
    }

    getUsersFromDB() {
        return new Promise((resolve, reject) => {
            resolve(
                axios.get('http://localhost:3000/users')
            );
        }).then(res => {
            return res.data;
        });
    }

    resToUsers(res) {
        for (let user of res) {
            let auxUser = {};

            auxUser.firstName = user.userFirstname;
            auxUser.lastName = user.userLastname;
            auxUser.email = user.userEmail;
            auxUser.username = user.userUsername;
            auxUser.password = user.userPassword;

            let userModel = new UserModel(auxUser);
            this.allUsers.push(userModel);
        }
    }

    getAllUsers() {
        return this.getUsersFromDB().then((res) => {
            this.resToUsers(res);
            return this.allUsers;
        });
    }

    getUserByUsername(username) {
        return this.getAllUsers().then(() => {
            return this.allUsers.filter((user) => {
                if (user.username === username) {
                    return user;
                }
            });
        });
    }
}