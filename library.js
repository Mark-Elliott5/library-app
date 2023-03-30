"use strict"

const form = document.getElementById('book-submission');
form.addEventListener('submit', addBookToLibrary);
form.addEventListener('click', (e) => {
  e.stopPropagation();
})

const formWrapper = document.getElementById('form-wrapper');
formWrapper.addEventListener('click', () => {
  formWrapper.classList.add('hidden');
})

const newBook = document.getElementById('new-book');
newBook.addEventListener('click', () => {
  formWrapper.classList.remove('hidden');
})

const shelf = document.getElementById('shelf');

const booksRead = document.getElementById('books-read');
const booksUnread = document.getElementById('books-unread');
const totalBooks = document.getElementById('total-books');
const pagesRead = document.getElementById('pages-read');

let myLibrary = [];
let bookIncrement = 0;

// function Book(title, author, pages, read, id) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   if (read) {
//     this.read = true;
//   } else {
//     this.read = false;
//   }
//   this.id = id;
// }

class Book {

  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get author() {
    return this._author;
  }

  set author(value) {
    this._author = value;
  }

  get pages() {
    return this._pages;
  }

  set pages(value) {
    this._pages = value;
  }

  get read() {
    return this._read;
  }

  set read(value) {
    if (value) {
      this._read = true;
    } else { 
      this._read = false;
    }
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}

function addBookToLibrary(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const numberOfPages = formData.get('number-of-pages');
  const readStatus = formData.get('read-status');
  const id = bookIncrement;
  const newBook = new Book(title, author, numberOfPages, readStatus, id);
  bookIncrement++;
  myLibrary.push(newBook);
  form.reset();
  shelveBooks();
  formWrapper.classList.add('hidden');
}

function shelveBooks() {
  shelf.innerHTML = 
    `<div id="shelf-header">
    <span id="title-cell">Title</span>
    <span id="author-cell">Author</span>
    <span id="pages-cell">Pages</span>
    <span id="status-cell">Status</span>
    </div>`;
  booksRead.textContent = 0;
  booksUnread.textContent = 0;
  pagesRead.textContent = 0;
  totalBooks.textContent = 0;
  for (let i = 0; i < myLibrary.length; i++) {
    createDiv(myLibrary[i]);
  }
}

function createDiv(book) {
  const bookToBeShelved = document.createElement('div');
  bookToBeShelved.id = `${book.id}`;
  bookToBeShelved.classList.add('book');
  if (book.read) {
    bookToBeShelved.classList.add('read');
    booksRead.textContent = parseInt(booksRead.textContent, 10) + 1;
    pagesRead.textContent = parseInt(pagesRead.textContent, 10) + parseInt(book.pages, 10);
  } else {
    bookToBeShelved.classList.add('unread');
    booksUnread.textContent = parseInt(booksUnread.textContent, 10) + 1;
  }

  totalBooks.textContent = parseInt(totalBooks.textContent, 10) + 1;

  const bookDetails = document.createElement('ul');

  const deleteButtonWrapper = document.createElement('li');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', removeBook);
  deleteButtonWrapper.appendChild(deleteButton);
  deleteButtonWrapper.style = 'grid-column: 1;';

  const closeIcon = document.createElement('img');
  closeIcon.src = 'images/close-icon.svg';
  deleteButton.appendChild(closeIcon);

  const bookTitle = document.createElement('li');
  bookTitle.innerText = book.title;
  bookTitle.style = 'grid-column: 2;';

  const bookAuthor = document.createElement('li');
  bookAuthor.innerText = book.author;
  bookAuthor.style = 'grid-column: 3;';

  const bookPages = document.createElement('li');
  bookPages.innerText = book.pages;
  bookPages.style = 'grid-column: 4;';

  const bookRead = document.createElement('li');
  bookRead.innerText = `${book.read ? `Read` : `Unread`}`;
  bookRead.style = 'grid-column: 5;';

  const readStatusButtonWrapper = document.createElement('li');
  const readStatusButton = document.createElement('button');
  readStatusButtonWrapper.appendChild(readStatusButton);
  readStatusButton.innerText = 'Toggle Read Status';
  readStatusButton.style = 'grid-column: 6;';
  readStatusButton.addEventListener('click', changeReadStatus);

  bookDetails.appendChild(deleteButtonWrapper);
  bookDetails.appendChild(bookTitle);
  bookDetails.appendChild(bookAuthor);
  bookDetails.appendChild(bookPages);
  bookDetails.appendChild(bookRead);
  bookDetails.appendChild(readStatusButtonWrapper);
  bookToBeShelved.appendChild(bookDetails);
  shelf.appendChild(bookToBeShelved)
}

function removeBook(e) {
  const bookId = e.target.parentNode.parentNode.parentNode.id;
  const bookIndex = myLibrary.findIndex((element) => element.id == bookId);
  myLibrary.splice(bookIndex, 1);
  shelveBooks();
}

function changeReadStatus(e) {
  const bookId = e.target.parentNode.parentNode.parentNode.id;
  const bookIndex = myLibrary.findIndex((element) => element.id == bookId);
  myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
  shelveBooks();
}