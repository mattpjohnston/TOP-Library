const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;

  this.read = read ? "read" : "not read yet";

  this.id = crypto.randomUUID();
  this.info = function () {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      this.read
    );
  };
}

Book.prototype.toggleRead = function (id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  const book = myLibrary[index];
  if (book.read === "read") {
    book.read = "not read yet";
  } else if (book.read === "not read yet") {
    book.read = "read";
  }
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    addToPage(myLibrary);
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
    delButton.addEventListener("click", () => removeBook(book.id));

    const toggleReadButton = document.createElement("button");
    toggleReadButton.classList.add("toggle-read-btn");
    toggleReadButton.innerText = "Mark as read/unread";
    bookCard.appendChild(toggleReadButton);
    toggleReadButton.addEventListener("click", () => {
      Book.prototype.toggleRead(book.id);
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

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  if (title && author && pages && pages > 0) {
    addBookToLibrary(title, author, pages, read);
    addToPage(myLibrary);
    formDialog.close();
    form.reset();
  } else {
    alert("Please fill in all fields and ensure pages is a positive number.");
  }
});

addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, false);

addToPage(myLibrary);
