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

}