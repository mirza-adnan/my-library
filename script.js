let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
if (!myLibrary) {
    myLibrary = [];  // so that myLibrary never becomes null
}




let Book = function(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// opening and closing the popup
const popup = document.querySelector("#popup-bg")
const addButtons = document.querySelectorAll(".add");
addButtons.forEach(button => {
    button.addEventListener("click", function() {
        togglePopup("flex");
    })
})

const closeButton = document.querySelector("#close-button");
closeButton.addEventListener("click", function() {
    togglePopup("none");
})

function togglePopup(display) {
    popup.style.display = display;
}

// reference to all the book inputs
const title = document.querySelector("#title-input");
const author = document.querySelector("#author-input");
const pages = document.querySelector("#pages-input");
const finished = document.querySelector("input[type='checkbox']")

// function for validating the form
function validateForm() {
    if (title.value === "") {
        alert("You must enter a book title");
        return false;
        
    }

    if (Number(pages.value) < 0) {
        alert("Number of pages cannot be negative");
        return false;
    }
    return true
}

// function for resetting the popup
function resetForm() {
    title.value = "";
    author.value = "";
    pages.value = "";
    finished.checked = false;
}

// function for submit button
const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", function() {
    if (validateForm()) {
        createBookObject()
        resetForm()
        saveStorage()
        closeButton.click()
        createBookCard()
    } else {
        resetForm()
    }
})

// function to create book objects
function createBookObject() {
    const newBook = new Book(title.value, author.value, pages.value, finished.checked)
    myLibrary.push(newBook);
}

function saveStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
}

// creating book cards
const main = document.querySelector("main");
const addCard = document.querySelector("#add-button");

function createBookCard() {
    if (myLibrary) {
        myLibrary.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
    
            const bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");
    
            const bookTitle = document.createElement("h2");
            const bookAuthor = document.createElement("p");
            const pageCount = document.createElement("p")
            const status = document.createElement("p")
    
            const cardButtons = document.createElement("div");
            cardButtons.classList.add("book-buttons");
            
            const editStatus = document.createElement("div");
            editStatus.classList.add("edit-status");
    
            const editButton = document.createElement("div");
            editButton.classList.add("book-button", "edit-button");
            const editImage = document.createElement("img");
            editImage.setAttribute("src", "img/edit.png")
            editButton.appendChild(editImage);
    
            const finishedButton = document.createElement("div");
            finishedButton.classList.add("book-button", "finished-button");
            const finishedImage = document.createElement("img");
            finishedImage.setAttribute("src", "img/tick.png");
            finishedButton.appendChild(finishedImage);
    
            const deleteButton = document.createElement("div");
            deleteButton.classList.add("book-button", "delete-button");
            const deleteImage = document.createElement("img");
            deleteImage.setAttribute("src", "img/delete.png");
            deleteButton.appendChild(deleteImage);
    
            editStatus.appendChild(editButton);
            editStatus.appendChild(finishedButton);
            
            cardButtons.appendChild(editStatus);
            cardButtons.appendChild(deleteButton);
            
            bookInfo.appendChild(bookTitle);
            bookInfo.appendChild(bookAuthor);
            bookInfo.appendChild(pageCount);
            bookInfo.appendChild(status);
    
            bookTitle.textContent = book.title;
            if (book.author) {
                bookAuthor.textContent = book.author;
            } else {
                bookAuthor.textContent = "Unknown Author";
            }
        
            if (book.pages) {
                pageCount.textContent = `${book.pages} Pages`
            } else {
                pageCount.textContent = "Page Count Unknown"
            }
        
            if (book.read) {
                status.textContent = "Finished";
            } else {
                status.textContent = "Unfinished";
            }
    
            bookCard.appendChild(bookInfo);
            bookCard.appendChild(cardButtons)
    
            main.insertBefore(bookCard, addCard)
            
        })
    }
    
}

createBookCard()

