"use strict"

const form = document.getElementById('book-submission');


form.addEventListener("submit", addBookToLibrary, true);

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  event.preventDefault();
  let formData = new FormData(event.target);
  let title = formData.get('title');
  let author = formData.get('author');
  let numberOfPages = formData.get('number-of-pages');
  let readStatus = formData.get('read-status');
  let newBook = new Book(title, author, numberOfPages, readStatus);
  myLibrary.push(newBook);
}