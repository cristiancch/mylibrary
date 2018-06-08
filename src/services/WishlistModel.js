export default class WishlistModel {

    constructor(wishlist) {
        this.bookId = wishlist.id;
        this.users = wishlist.users;
    }

    get id() {
        return this.bookId;
    }

    get bookUsers() {
        return this.users;
    }

    set id(id) {
        this.bookId = id;
    }

    set bookUsers(users) {
        this.users = users;
    }
}