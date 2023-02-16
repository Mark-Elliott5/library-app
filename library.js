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
    bookToBeShelved.id = `${bookIncrement}`;
    bookToBeShelved.classList.add('book');
    if (readStatus) {
      bookToBeShelved.classList.add('read');
      booksRead.textContent = parseInt(booksRead.textContent, 10) + 1;
      pagesRead.textContent = parseInt(pagesRead.textContent, 10) + parseInt(numberOfPages, 10);
    } else {
      bookToBeShelved.classList.add('unread');
      booksUnread.textContent = parseInt(booksUnread.textContent, 10) + 1;
    }
    totalBooks.textContent = parseInt(totalBooks.textContent, 10) + 1;

    const bookDetails = document.createElement('ul');

    const deleteButtonWrapper = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.name = 'delete';
    deleteButton.addEventListener('click', removeBook);
    deleteButtonWrapper.appendChild(deleteButton);
    deleteButtonWrapper.style= 'grid-column: 1;';

    const bookTitle = document.createElement('li');
    bookTitle.innerText = title;
    bookTitle.style = 'grid-column: 2;';

    const bookAuthor = document.createElement('li');
    bookAuthor.innerText = author;
    bookAuthor.style = 'grid-column: 3;';

    const bookPages = document.createElement('li');
    bookPages.innerText = numberOfPages;
    bookPages.style = 'grid-column: 4;';

    const bookRead = document.createElement('li');
    bookRead.innerText = `${readStatus ? `Read` : `Unread`}`;
    bookRead.style = 'grid-column: 5;';

    bookDetails.appendChild(deleteButtonWrapper);
    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookAuthor);
    bookDetails.appendChild(bookPages);
    bookDetails.appendChild(bookRead);
    bookToBeShelved.appendChild(bookDetails);
    shelf.appendChild(bookToBeShelved)
    bookIncrement += 1;
}

function removeBook(e) {
  const bookId = e.target.parentNode.parentNode.parentNode.id;
  const bookIndex = myLibrary.findIndex((element) => element.id = bookId);
  const bookToBeDeleted = myLibrary[bookIndex];
  if (bookToBeDeleted.read) {
    booksRead.textContent = parseInt(booksRead.textContent, 10) - 1;
    pagesRead.textContent = parseInt(pagesRead.textContent, 10) - parseInt(bookToBeDeleted.pages, 10);
  } else {
    booksUnread.textContent = parseInt(booksUnread.textContent, 10) - 1;
  }
  totalBooks.textContent = parseInt(totalBooks.textContent, 10) - 1;
  e.target.parentNode.parentNode.parentNode.remove();
  myLibrary.splice(bookIndex, 1);
}