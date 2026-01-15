class Library {
  books = [];

  addBook(book) {
    this.books.push(book);
  }

  removeBook(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      addToPage(myLibrary.books);
    }
  }
}

const myLibrary = new Library();

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? "read" : "not read yet";
  }

  id = crypto.randomUUID();

  toggleRead() {
    this.read = this.read === "read" ? "not read yet" : "read";
  }
}

function addToPage(arr) {
  const bookShelf = document.getElementById("bookshelf");
  bookShelf.innerHTML = "";

  for (let book of arr) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);

    const titleElement = document.createElement("h2");
    titleElement.classList.add("book-title");

    const authorElement = document.createElement("p");
    authorElement.classList.add("book-author");

    const pagesElement = document.createElement("p");
    pagesElement.classList.add("book-pages");

    const readElement = document.createElement("p");
    readElement.classList.add("book-status");

    titleElement.innerText = book.title;
    bookCard.appendChild(titleElement);

    authorElement.innerText = "Author: " + book.author;
    bookCard.appendChild(authorElement);

    pagesElement.innerText = "Pages: " + book.pages;
    bookCard.appendChild(pagesElement);

    readElement.innerText = "Status: " + book.read;
    bookCard.appendChild(readElement);

    const delButton = document.createElement("button");
    delButton.classList.add("delete-btn");
    delButton.innerText = "Delete";
    bookCard.appendChild(delButton);
    delButton.addEventListener("click", () => myLibrary.removeBook(book.id));

    const toggleReadButton = document.createElement("button");
    toggleReadButton.classList.add("toggle-read-btn");
    toggleReadButton.innerText = "Mark as read/unread";
    bookCard.appendChild(toggleReadButton);
    toggleReadButton.addEventListener("click", () => {
      book.toggleRead();
      readElement.innerText = "Status: " + book.read;
    });

    bookShelf.appendChild(bookCard);
  }
}

const formDialog = document.querySelector("#dialog");

const form = document.querySelector("#book-form");

const addBookButton = document.querySelector("#add-book-button");

const bookFormButton = document.querySelector("#book-form-button");

addBookButton.addEventListener("click", () => {
  formDialog.show();
});

bookFormButton.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");

  title.setCustomValidity("");
  if (!title.value) {
    title.setCustomValidity("Please enter a title");
    title.reportValidity();
    return;
  }

  author.setCustomValidity("");
  if (!author.value) {
    author.setCustomValidity("Please enter an author");
    author.reportValidity();
    return;
  }

  pages.setCustomValidity("");
  if (!pages.value || pages.value < 1) {
    pages.setCustomValidity("Please enter number of pages greater than 0");
    pages.reportValidity();
    return;
  }

  myLibrary.addBook(
    new Book(title.value, author.value, pages.value, read.checked),
  );
  addToPage(myLibrary.books);
  formDialog.close();
  form.reset();
});

myLibrary.addBook(new Book("The Hunger Games", "Suzanne Collins", 374, true));
myLibrary.addBook(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
myLibrary.addBook(new Book("1984", "George Orwell", 328, false));
myLibrary.addBook(new Book("To Kill a Mockingbird", "Harper Lee", 281, true));
myLibrary.addBook(new Book("Pride and Prejudice", "Jane Austen", 432, false));

addToPage(myLibrary.books);
