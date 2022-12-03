// Stores the Submit button in a variable
let btn = document.querySelector("#submit");
let bodyTag = document.querySelector("body");
let count = 1;
let audio = new Audio("audio/ding.mp3");
let itemDeleted = false;

// This function adds a new item to the To Do List
function addToDo() {
  // Stores the body tag in a variable, and creates a new div tag variable
  
  let divTag = document.createElement("DIV");

  // Creates new p tags. p1 for the number before the item, and p2 for the item string itself
  let p1 = document.createElement("P");
  let p2 = document.createElement("P");

  // Appends the new div tag to the body
  bodyTag.appendChild(divTag);

  // Stores what the user typed in the input field
  let newToDo = document.querySelector("#todo").value;

  // Creates a new checkbox
  let checkBox = document.createElement("INPUT");
  checkBox.setAttribute("type", "checkbox");

  // Creates a new paragraph field where the To Do List item will be displayed
  let pCount = document.createTextNode(count + ".");
  let pToDo = document.createTextNode(newToDo);

  // Creates a new Delete button
  let deleteBtn = document.createElement("BUTTON");
  deleteBtn.innerHTML = "Delete";

  // Appends the p1, checkbox, p2, and delete button to the parent tag element
  divTag.appendChild(p1);
  p1.appendChild(pCount);

  divTag.appendChild(checkBox);
  divTag.appendChild(p2);
  p2.appendChild(pToDo);

  divTag.appendChild(deleteBtn);

  // Resets the input field
  document.querySelector("#todo").value = "";

  // Increment count variable by 1 so that when we add a new item to the list it is the next number in order
  count++;

  // If an item was deleted decrement the count
  if (itemDeleted) {
    count--;
    itemDeleted = false;
  }

  // Adds an event listener to the delete button that will call the deleteToDo() function
  deleteBtn.addEventListener("click", function () {
    deleteToDo(divTag);
  });

  // Adds an event listener to the checkbox that will call the strikeThrough() function, and make a ding sound
  checkBox.addEventListener("click", function () {
    strikeThrough(p2, divTag);
    if (checkBox.checked) {
      audio.play();
    }
  });
}

// Submit button calls the, "addToDo" function when clicked
btn.addEventListener("click", addToDo);

// Function that removes the div tag from the to do list and updates the count
function deleteToDo(divTag) {
  divTag.style.backgroundColor = "red";
  divTag.style.transition = "opacity 1s";
  divTag.style.opacity = 0;
  setTimeout(function() {
    divTag.remove();
    updateCount();
  }, 1000);
}

// Function that adds a line through the to do list item if the checkbox is checked
function strikeThrough(p2, divTag) {
  if (p2.classList.contains("strike")) {
    p2.classList.remove("strike");
    divTag.style.backgroundColor = "blanchedalmond";
  } else {
    p2.classList.add("strike");
    divTag.style.backgroundColor = "lightgreen";
  }
}

// Allows the user to hit "Enter" to submit an item instead of manually having to click the submit button
let inputField = document.querySelector("#todo");
inputField.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addToDo();
  }
});

// Updates the count of the p1 tag (That displays the numbers) and assures they are always in the correct numerical order
function updateCount() {
  let pCountElements = document.querySelectorAll("body > div > p:nth-child(1)");
  for (let i = 0; i < pCountElements.length; i++) {
    pCountElements[i].innerText = (i + 1) + ".";
  }
  count--;
}