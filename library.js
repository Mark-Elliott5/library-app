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

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read) {
    this.read = true;
  } else {
    this.read = false;
  }
}

function addBookToLibrary(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const numberOfPages = formData.get('number-of-pages');
  const readStatus = formData.get('read-status');
  const newBook = new Book(title, author, numberOfPages, readStatus);
  myLibrary.push(newBook);
  form.reset();
  shelveBook();
  formWrapper.classList.add('hidden');
}

function shelveBook() {
    const book = myLibrary[myLibrary.length-1];
    const title = book.title;
    const author = book.author;
    const numberOfPages = book.pages;
    const readStatus = book.read;
    const bookToBeShelved = document.createElement('div');
    bookToBeShelved.classList.add('book');
    const bookDetails = document.createElement('ul');
    const bookTitle = document.createElement('li');
    bookTitle.innerText = title;
    const bookAuthor = document.createElement('li');
    bookAuthor.innerText = author;
    const bookPages = document.createElement('li');
    bookPages.innerText = numberOfPages;
    const bookRead = document.createElement('li');
    bookRead.innerText = `${readStatus ? `Read` : `Unread`}`;
    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookAuthor);
    bookDetails.appendChild(bookPages);
    bookDetails.appendChild(bookRead);
    bookToBeShelved.appendChild(bookDetails);
    shelf.appendChild(bookToBeShelved)
}