const myLibrary = []

function Book(title, author, pages, read){
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read
    toggleRead = ()=>{
        this.read = !this.read
    }
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
            <button onclick="toggleReadStatus(${index})" class="read-status-btn">${book.read ? 'Read' : 'Not Read'}</button>
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