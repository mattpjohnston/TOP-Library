const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;

  if (read) this.read = "read";
  else this.read = "not read yet";

  this.id = crypto.randomUUID();
  this.info = function () {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;
  };
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, false);

function addToPage(arr) {
  const bookShelf = document.getElementById("bookshelf");
  bookShelf.innerHTML = "";

  for (let book of arr) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("book-title");

    const authorElement = document.createElement("p");
    authorElement.classList.add("book-author");

    const pagesElement = document.createElement("p");
    pagesElement.classList.add("book-pages");

    const readElement = document.createElement("p");
    readElement.classList.add("book-status");

    const title = titleElement;
    title.innerText = book.title;
    bookCard.appendChild(title);

    const author = authorElement;
    author.innerText = "Author: " + book.author;
    bookCard.appendChild(author);

    const pages = pagesElement;
    pages.innerText = "Pages: " + book.pages;
    bookCard.appendChild(pages);

    const read = readElement;
    read.innerText = "Status: " + book.read;
    bookCard.appendChild(read);

    const delButton = document.createElement("button");
    delButton.classList.add("delete-btn");
    delButton.innerText = "Delete";
    bookCard.appendChild(delButton);

    bookShelf.appendChild(bookCard);

    console.log(bookCard);
  }
}

// TODO
function submitAddBookForm() {}

// TODO
function removeBook() {}

addToPage(myLibrary);
