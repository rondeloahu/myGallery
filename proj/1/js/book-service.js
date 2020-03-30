'use strict'
const gNames = ['JS', 'HTML', 'CSS', 'WIX', 'Text_Editor', 'Robots'];
const gImgs = ['📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚'];
const KEY = 'Books';
const STAR = '⭐️';
var gBooks;
const PAGE_SIZE = 5;
var gPageIdx = 0;


function nextPage() {
    // var currIdx = gPageIdx*PAGE_SIZE;
    if (gPageIdx < 3) gPageIdx++;
    else gPageIdx = 0;
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}
function getnames() {
    return gNames;
}

function deleteBook(BookId) {
    var BookIdx = gBooks.findIndex(function (Book) {
        return BookId === Book.id
    })
    gBooks.splice(BookIdx, 1)
    _saveBooksToStorage();

}

function addBook(name, price) {
    var Book = _createBook(name, price)
    gBooks.unshift(Book)
    _saveBooksToStorage();
}

function getBookById(BookId) {
    var Book = gBooks.find(function (Book) {
        return BookId === Book.id
    })
    return Book
}

function updateBook(BookId, newPrice) {
    const Book = gBooks.find(function (Book) {
        return Book.id === BookId;
    })
    Book.price = newPrice;
    _saveBooksToStorage();
}

function _createBook(name, price) {
    if (!price) price = getRandomIntInclusive(30, 450)
    return {
        id: makeId(),
        name,
        img: gImgs[getRandomIntInclusive(0, gImgs.length)],
        price,
        rate: STAR.repeat(getRandomIntInclusive(1, 6)),
        desc: makeLorem()
    }
}

function createBooks() {
    var Books = loadFromStorage(KEY)
    if (!Books || !Books.length) {
        Books = [];
        gNames.forEach(name => {
            Books.push(_createBook(name))
        })
    }
    gBooks = Books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}
