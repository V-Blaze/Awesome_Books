const bookCollection = [];

const addTitle = document.querySelector('#addTitle');
const addAuthor = document.querySelector('#addAuthor');
const addForm = document.querySelector('#addBook');

let newBook;

addForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
    newBook = {
      title: addTitle.value,
      author: addAuthor.value,
  }
  bookCollection.push(newBook);
  console.log(bookCollection);
});