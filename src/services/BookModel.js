export default class BookModel {

    constructor(book) {
        this.bookId = book.id;
        this.bookTitle = book.title;
        this.bookAuthor = book.author;
        this.bookISBN = book.ISBN;
        this.bookPrice = book.price;
        this.bookCategory = book.category;
        this.bookDescription = book.details;
        this.bookCover = book.cover;
        this.bookReadStatus = book.readedStatus;
        this.wishlistId = book.wishlistId;
        this.username = book.username;
        this.users = book.users;
    }

    get bookUsers() {
        return this.users;
    }

    get id() {
        return this.bookId;
    }

    get title() {
        return this.bookTitle;
    }


    get author() {
        return this.bookAuthor;
    }

    get ISBN() {
        return this.bookISBN;
    }

    get price() {
        return this.bookPrice;
    }

    get category() {
        return this.bookCategory;
    }

    get details() {
        return this.bookDescription;
    }

    get cover() {
        return this.bookCover;
    }

    get readedStatus() {
        return this.bookReadStatus;
    }

    set id(id) {
        this.bookId = id;
    }

    set title(title) {
        this.bookTitle = title;
    }

    set author(author) {
        this.bookAuthor = author;
    }

    set ISBN(ISBN) {
        this.bookISBN = ISBN;
    }

    set category(category) {
        this.bookCategory = category;
    }

    set details(description) {
        this.bookDescription = description;
    }

    set cover(cover) {
        this.bookCover = cover;
    }

    set readedStatus(status) {
        this.bookReadStatus = status;
    }

    set bookUsers(users) {
        this.users = users;
    }

}