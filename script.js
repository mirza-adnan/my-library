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


