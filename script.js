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
        createBookObject();  // creating a book object and pushing it to the end of the array
        resetForm();  // resetting the inputs of the popup
        saveRemoveCreate()
        closeButton.click();  // closing the popup
    } else {
        resetForm()
    }
})

function saveRemoveCreate() {
    saveStorage();  // saving the new array in the local storage
    removeAllBooks();  // first we remove all the existing books from the display so there arent duplicates
    createBookCard()  // creating a new card to display the book 
}

// function to create book objects
function createBookObject() {
    const newBook = new Book(title.value, author.value, pages.value, finished.checked)
    myLibrary.push(newBook);
}

function saveStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

// creating book cards
const main = document.querySelector("main");
const addCard = document.querySelector("#add-button");

function createBookCard() {
    if (myLibrary) {
        let index = 0;
        myLibrary.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.setAttribute("data-index", String(index))
    
            const bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");
    
            const bookTitle = document.createElement("h2");
            const bookAuthor = document.createElement("p");
            const pageCount = document.createElement("p")
            const status = document.createElement("p")
    
            const cardButtons = document.createElement("div");
            cardButtons.classList.add("card-buttons");
    
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
    
            cardButtons.appendChild(editButton);
            cardButtons.appendChild(finishedButton);
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
                status.textContent = "Status: Finished";
            } else {
                status.textContent = "Status: Unfinished";
            }
    
            bookCard.appendChild(bookInfo);
            bookCard.appendChild(cardButtons)
    
            main.insertBefore(bookCard, addCard)

            deleteEvent()  // adding event listeners to the delete button of new books
            
            index += 1;
            
        })

        deleteEvent()  // adding event listeners to the delete button of new books
        hoverEffect()
    }
    
}

function removeAllBooks() {
    const books = document.querySelectorAll(".book-card");
    books.forEach(book => {
        book.remove()
    })
}

// delete button
function deleteEvent() {
    const deleteButton = document.querySelectorAll(".delete-button");
    deleteButton.forEach(btn => {
        btn.addEventListener("click", function() {
            const parent = btn.parentNode.parentNode;
            const parentIndex = parent.getAttribute("data-index");
            myLibrary.splice(Number(parentIndex), 1);
            saveRemoveCreate()
        })
    })
}

function hoverEffect() {
    const bookCard = document.querySelectorAll(".book-card");
    bookCard.forEach(card => {
        card.addEventListener("mouseover", function() {
            const buttons = card.querySelector(".card-buttons");
            buttons.style.opacity = "1";
        })
        card.addEventListener("mouseout", function() {
            const buttons = card.querySelector(".card-buttons");
            buttons.style.opacity = "0";
        })
    })
}

createBookCard()
deleteEvent()
hoverEffect()