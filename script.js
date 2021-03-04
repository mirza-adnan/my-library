let myLibrary = [];

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
        resetPopup()
        alert("You must enter a book title");
        return false;
        
    }

    if (Number(pages.value) < 0) {
        resetPopup()
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



