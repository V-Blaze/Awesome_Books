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

	addBookToStorage() {
		const str = JSON.stringify(bookCollection);
		localStorage.setItem('storedBookData', str);
	}
}

const deleteBook = (id) => {
	const itemToDelete = bookCollection[id];

	bookCollection = bookCollection.filter((item) => item !== itemToDelete);
	addBookToStorage();
	// eslint-disable-next-line no-use-before-define
	showBooks();
};

const addBtnRemoveEvent = () => {
	document.querySelectorAll('.delete_btn').forEach((button) =>
		button.addEventListener('click', (event) => {
			event.preventDefault();
			const { id } = button;
			deleteBook(id);
		})
	);
};

const showBooks = () => {
	formData = JSON.parse(localStorage.getItem('storedBookData'));
	bookCollection = formData;
	allBooks.innerHTML = '';
	formData.forEach((book, index) => {
		bookCollectionHtml = document.createElement('div');
		bookCollectionHtml.innerHTML = `
      <h3 class="book-title">${book.title}</h3>
      <h3 class="book-author">${book.author}</h3>
      <button class="delete_btn" id="${index}">Remove</button>
      <hr>
    `;
		allBooks.appendChild(bookCollectionHtml);
	});

	addBtnRemoveEvent();
};

addForm.addEventListener('submit', (event) => {
	event.preventDefault();
	newBook = new Book(addTitle.value, addAuthor.value);

	bookCollection.push(newBook);

	newBook.addBookToStorage();

	showBooks();
});

window.onload = () => {
	if (localStorage.getItem('storedBookData') !== null) {
		showBooks();
	}
};
