const bookCollection = [];

const addTitle = document.querySelector("#addTitle");
const addAuthor = document.querySelector("#addAuthor");
const addForm = document.querySelector("#addBook");
const allBooks = document.querySelector(".books");

let newBook;
let formData;
let bookCollectionHtml;

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newBook = {
    title: addTitle.value,
    author: addAuthor.value,
  };
  bookCollection.push(newBook);
  str = JSON.stringify(bookCollection);
  localStorage.setItem("storedBookData", str);
  console.log(bookCollection);

  showBooks();
});

let showBooks = () => {
  formData = JSON.parse(localStorage.getItem("storedBookData"));
  allBooks.innerHTML = "";
  formData.forEach((book) => {
    bookCollectionHtml = document.createElement("div");
    bookCollectionHtml.innerHTML = `
      <h3 class="book-title">${book.title}</h3>
      <h3 class="book-author">${book.author}</h3>
      <button>Remove</button>
      <hr>
    `;
    allBooks.appendChild(bookCollectionHtml);
  });
};
