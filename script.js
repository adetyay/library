const myLibrary = []

function Book(title, author, pages, read){
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read
}

Book.prototype.toggleRead = function(){
    this.read = !this.read
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    displayBooks()
}

function displayBooks(){
    const bookList = document.getElementById('bookList')
    bookList.innerHTML = ''
    
    myLibrary.forEach((book, index)=>{
        const bookCard = document.createElement('div')
        bookCard.classList.add('book-card')
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleReadStatus(${index})">Toggle Read</button>
            `
            bookList.appendChild(bookCard)
    })
}

function removeBook(index){
    myLibrary.splice(index, 1)
    displayBooks()
}

function toggleReadStatus(index){
    myLibrary[index].toggleRead()
    displayBooks()
}

const newBookBtn = document.getElementById('newBookBtn')
const bookDialog = document.getElementById('bookDialog')
const bookForm = document.getElementById('bookForm')

newBookBtn.addEventListener('click', ()=>{
    bookDialog.showModal();
})

bookForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked

    addBookToLibrary(title, author, pages, read)
    bookForm.reset()
    bookDialog.close()
})

// Add event listener to close dialog when clicking outside
bookDialog.addEventListener("click", e => {
    const dialogDimensions = bookDialog.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        bookDialog.close();
    }
});

// Prevent closing when clicking inside the form
bookForm.addEventListener("click", e => {
    e.stopPropagation();
});

addBookToLibrary('Tuesdays with Morrie', 'Mitch Albom', 192, true);