let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
if (!myLibrary) {
    myLibrary = [];  // so that myLibrary never becomes null
}

// constructor
let Book = function(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeStatus = function() {
    this.read = !this.read;
}


createBookCard(); // creating the books when the page is first loaded

// opening and closing the popup
function togglePopup(display) {
    popup.style.display = display;
}

const popup = document.querySelector("#popup-bg");
const addButtons = document.querySelectorAll(".add");
addButtons.forEach(button => {
    button.addEventListener("click", function() {
        togglePopup("flex");
        window.scrollTo(0, 0);
    })
})

const closeButton = document.querySelector("#close-button");
closeButton.addEventListener("click", function() {
    togglePopup("none");
    resetForm();
})



// reference to all the book inputs
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const finishedInput = document.querySelector("input[type='checkbox']")
const popUpTitle = document.querySelector("#popup-title");

// function for validating the form
function validateForm() {
    if (titleInput.value === "") {
        alert("You must enter a book title");
        return false;
        
    }

    if (Number(pagesInput.value) < 0) {
        alert("Number of pages cannot be negative");
        return false;
    }
    return true;
}

// function for resetting the popup
function resetForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    finishedInput.checked = false;
    popUpTitle.textContent = "New Book";
    editMode = false;
}

// edit function
let editMode;  // this is to differentiate between adding a new book and editing an existing book
let editIndex;  // to carry the index of the book object that is to be editted

// function to add event listeners to all the edit buttons
function editEvent() {
    const editButton = document.querySelectorAll(".edit-button");
    editButton.forEach(btn => {
        btn.addEventListener("click", function() {
            editMode = true;
            const book = btn.parentNode.parentNode;
            const bookIndex = Number(book.getAttribute("data-index"));
            const bookObject = myLibrary[bookIndex];

            popUpTitle.textContent = "Edit Book";

            titleInput.value = bookObject.title;
            authorInput.value = bookObject.author;
            pagesInput.value = bookObject.pages;
            if (bookObject.read) {
                finishedInput.checked = true;
            } else {
                finishedInput.checked = false;
            }
            togglePopup("flex")
            editIndex = bookIndex;
        })
    })
}

function editObject(obj) {
    obj.title = titleInput.value;
    obj.author = authorInput.value;
    obj.pages = pagesInput.value;
    obj.read = finishedInput.checked;
}

// function to create book objects
function createBookObject() {
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, finishedInput.checked);
    myLibrary.push(newBook);
}

// function for submit button
const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", function() {
    if (validateForm()) {
        
        if (editMode) {  // this will be executed if you are editing an existing book
            bookObject = myLibrary[editIndex];
            editObject(bookObject);
            closeButton.click();
            saveRemoveCreate();
        } else {  // this will be executed if you are trying to add a new book
            createBookObject();
            saveRemoveCreate();
            closeButton.click();
        }

    } else {
        resetForm();
    }
})

function saveRemoveCreate() {
    saveStorage();  // saving the new array in the local storage and getting the saved array
    removeAllBooks();  // first we remove all the existing books from the display so there arent duplicates
    createBookCard(); // creating a new card for every object in the array
}



function saveStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

function removeAllBooks() {
    const books = document.querySelectorAll(".book-card");
    books.forEach(book => {
        book.remove();
    })
}

function createBookCard() {
    const main = document.querySelector("main");
    const addCard = document.querySelector("#add-button");
    if (myLibrary) {
        let index = 0;
        myLibrary.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.setAttribute("data-index", String(index));
    
            const bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");
    
            const bookTitle = document.createElement("h2");
            const bookAuthor = document.createElement("p");
            const pageCount = document.createElement("p");
            const status = document.createElement("p");

            bookTitle.classList.add("book-title");
            bookAuthor.classList.add("book-author");
            pageCount.classList.add("page-count");
            status.classList.add("status");
    
            const cardButtons = document.createElement("div");
            cardButtons.classList.add("card-buttons");
    
            const editButton = document.createElement("div");
            editButton.classList.add("book-button", "edit-button");
            const editImage = document.createElement("img");
            editImage.setAttribute("src", "img/edit.png")
            editButton.appendChild(editImage);
    
            const statusButton = document.createElement("div");
            
            if (book.read) {
                statusButton.classList.add("book-button", "status-button", "unfinished-button");
                const finishedImage = document.createElement("img");
                finishedImage.setAttribute("src", "img/cross.png");
                statusButton.appendChild(finishedImage);
            } else {
                statusButton.classList.add("book-button", "status-button", "finished-button");
                const finishedImage = document.createElement("img");
                finishedImage.setAttribute("src", "img/tick.png");
                statusButton.appendChild(finishedImage);
            }
            
    
            const deleteButton = document.createElement("div");
            deleteButton.classList.add("book-button", "delete-button");
            const deleteImage = document.createElement("img");
            deleteImage.setAttribute("src", "img/delete.png");
            deleteButton.appendChild(deleteImage);
    
            cardButtons.appendChild(editButton);
            cardButtons.appendChild(statusButton);
            cardButtons.appendChild(deleteButton);
            
            bookInfo.appendChild(bookTitle);
            bookInfo.appendChild(bookAuthor);
            bookInfo.appendChild(pageCount);
            bookInfo.appendChild(status);
    
            bookTitle.textContent = book.title;
            if (book.author) {
                bookAuthor.textContent = `Author: ${book.author}`;
            } else {
                bookAuthor.textContent = "Author: No Idea";
            }
        
            if (book.pages) {
                pageCount.textContent = `Pages: ${book.pages}`;
            } else {
                pageCount.textContent = "Pages: No Idea";
            }
        
            if (book.read) {
                status.textContent = "Status: Finished";
            } else {
                status.textContent = "Status: Unfinished";
            }
    
            bookCard.appendChild(bookInfo);
            bookCard.appendChild(cardButtons);
    
            main.insertBefore(bookCard, addCard);

            
            index += 1;
            
        })

        deleteEvent();
        hoverEffect();  
        toggleStatus();
        editEvent();
    }
    
}

// adding event listeners to delete buttons to delete a book card
function deleteEvent() {
    const deleteButton = document.querySelectorAll(".delete-button");
    deleteButton.forEach(btn => {
        btn.addEventListener("click", function() {
            const parent = btn.parentNode.parentNode;
            const parentIndex = parent.getAttribute("data-index");
            myLibrary.splice(Number(parentIndex), 1);
            saveRemoveCreate();
        })
    })
}

// making the buttons appear when hovering over the book card
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

// adding event listeners to status buttons to toggle between finished and unfinished state
function toggleStatus() {
    const finishedButton = document.querySelectorAll(".status-button");
    finishedButton.forEach(btn => {
        btn.addEventListener("click", function() {
            const book = btn.parentNode.parentNode;
            const statusButton = book.querySelector(".status-button");
            const status = book.querySelector(".status");
            const bookIndex = Number(book.getAttribute("data-index"));
            const statusImg = statusButton.querySelector("img");

            statusButton.classList.toggle("finished-button");
            statusButton.classList.toggle("unfinished-button");
            if (myLibrary[bookIndex].read) {
                status.textContent = "Status: Unfinished";
                statusImg.setAttribute("src", "img/tick.png");
                myLibrary[bookIndex].read = false;
            } else {
                status.textContent = "Status: Finished";
                statusImg.setAttribute("src", "img/cross.png");
                myLibrary[bookIndex].read = true;
            }
        })

    });
}



// keyboard shortcuts
window.addEventListener("keydown", function(e) {
    if (popup.style.display === "flex") {
        if (e.key === "Enter") {
            submitButton.click();
        }
        if (e.key === "Escape") {
            closeButton.click();
        }
    }
})
