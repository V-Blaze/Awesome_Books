const addTitle = document.querySelector('#addTitle');
const addAuthor = document.querySelector('#addAuthor');
const addForm = document.querySelector('#addBook');
const allBooks = document.querySelector('.books');
const listMenu = document.querySelector('#list-section');
const addBookMenu = document.querySelector('#add-book-section');
const contactMenu = document.querySelector('#contact-section');
const listSection = document.querySelector('.main');
const addBookSection = document.querySelector('.formSection');
const contactSection = document.querySelector('.contact');
const showCurrentTime = document.querySelector('.current-time');

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

  addAuthor.value = '';
  addTitle.value = '';

  showBooks();
});

const showDateTime = () => {
  const time = new Date();
  const curTime = time.toUTCString();
  showCurrentTime.textContent = curTime;
};

listMenu.addEventListener('click', (e) => {
  e.preventDefault();
  listSection.style.display = 'block';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';
});

addBookMenu.addEventListener('click', (e) => {
  e.preventDefault();
  addBookSection.style.display = 'block';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
});

contactMenu.addEventListener('click', (e) => {
  e.preventDefault();
  contactSection.style.display = 'block';
  listSection.style.display = 'none';
  addBookSection.style.display = 'none';
});

window.onload = () => {
  if (localStorage.getItem('storedBookData') !== null && localStorage.getItem('storedBookData') !== '[]') {
    showBooks();
    listSection.style.display = 'block';
    addBookSection.style.display = 'none';
    contactSection.style.display = 'none';
  }

  setInterval(showDateTime, 1000);
};
