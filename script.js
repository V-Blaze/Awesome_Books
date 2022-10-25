const addTitle = document.querySelector('#addTitle');
const addAuthor = document.querySelector('#addAuthor');
const addForm = document.querySelector('#addBook');
const allBooks = document.querySelector('.books');

let bookCollection = [];

let newBook;
let formData;
let bookCollectionHtml;
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBookToStorage() {
    const str = JSON.stringify(bookCollection);
    localStorage.setItem('storedBookData', str);
  }

  static deleteBook(id) {
    const itemToDelete = bookCollection[id];

    bookCollection = bookCollection.filter((item) => item !== itemToDelete);
  }
}

const addBtnRemoveEvent = () => {
  document.querySelectorAll('.delete_btn').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    const { id } = button;
    Book.deleteBook(id);
    Book.addBookToStorage();
    // eslint-disable-next-line no-use-before-define
    showBooks();
  }));
};

const showBooks = () => {
  formData = JSON.parse(localStorage.getItem('storedBookData'));
  bookCollection = formData;
  allBooks.innerHTML = '';
  formData.forEach((book, index) => {
    bookCollectionHtml = document.createElement('div');
    bookCollectionHtml.className = 'book-item';
    bookCollectionHtml.innerHTML = `

      <h3 class="book-title"><span>"${book.title}" by ${book.author}</span></h3>
      <button class="delete_btn" id="${index}">Remove</button>
    `;
    allBooks.appendChild(bookCollectionHtml);
  });

  addBtnRemoveEvent();
};

addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  newBook = new Book(addTitle.value, addAuthor.value);

  bookCollection.push(newBook);

  Book.addBookToStorage();

  showBooks();
});

window.onload = () => {
  if (localStorage.getItem('storedBookData') !== null) {
    showBooks();
  }
};
