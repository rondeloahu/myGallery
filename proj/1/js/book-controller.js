'use strict'
function onInit() {
    createBooks()
    renderBooks()
}

function renderBooks() {
    var Books = getBooks()
    var strHtmls = Books.map(function getBookHTML(Book) {
        return `
        <article class="Book-preview">
            <div class="Bookd-body">
                <h7 class="id-count">id: ${Book.id}</h7>
                <span class="Bookd-title">${Book.name}</span>
                <p class="Bookd-text">Price: ${Book.price}$</p>
                <button  class="read-btn" onclick="onReadBook('${Book.id}')">Read</button>
                <button  class="update-btn" onclick="onUpdateBook('${Book.id}')">Update</button>
                <button class="delete-btn" onclick="onDeleteBook('${Book.id}')">Delete</button>
            </div>
        </article> 
        `
    })
    document.querySelector('.Books-container').innerHTML = strHtmls.join('')
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onDeleteBook(BookId) {
    deleteBook(BookId)
    renderBooks()
}

function onShowAddBook() {
    const el = document.querySelector('.Book-edit');
    el.hidden = false;
}

function onUpdateBook(BookId) {
    var newprice = +prompt('price?');
    updateBook(BookId, newprice);
    renderBooks();
}

function onReadBook(BookId) {
    var Book = getBookById(BookId)
    var elModal = document.querySelector('.modal')
    if(!Book.img){
        elModal.querySelector('.book-img').innerHTML ='no img'
    }else{
        elModal.querySelector('.book-img').innerHTML = Book.img;
    }
    elModal.querySelector('.rating span').innerText = Book.rate;
    elModal.querySelector('h5').innerHTML = Book.name
    elModal.querySelector('h6').innerHTML = `price: ${Book.price}$`
    elModal.querySelector('p').innerText = Book.desc
    elModal.hidden = false;

}

function onSaveBook() {
    const elBookEdit = document.querySelector('.Book-edit');
    const elNameInput = elBookEdit.querySelector('input[name="name-book"]');
    const elpriceInput = elBookEdit.querySelector('input[name="price"]');
    const name = elNameInput.value;
    const price = elpriceInput.value;
    addBook(name, price)
    renderBooks();
    elNameInput.value = '';
    elpriceInput.value = '';
    elBookEdit.hidden = true;

}

function onNextPage() {
    nextPage();
    renderBooks();
}