// Document Selectors
// Inputs
const inputs = document.querySelectorAll("input");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const numberInput = document.querySelector("#number");
const dateInput = document.querySelector("#date");

// Form Elements
const form = document.querySelector("#create-account-form");
const firstSquare = document.querySelector(".first");
const secondSquare = document.querySelector(".second");
const errorsElement = document.querySelector("#errors");



// variables
let errors = [];

// If form inputs are correct show page cube to according condition
function firstActive() {
  if (sessionStorage.active != "secondTrue") {
  firstSquare.classList.add("greenColor");
  sessionStorage.setItem("active", "firstTrue");
  }
}

// If not return to 'active' condition
if (sessionStorage.active == "secondTrue") {
  firstSquare.querySelector("span").classList.add("display-n");
  firstSquare.querySelector("img").classList.add("display-y");
  inputs.forEach((input) => {
    input.parentElement.classList.add("success");
  });
  firstSquare.classList.add("greenColor");
} else if (sessionStorage.active == "firstTrue") {
  firstSquare.classList.add("greenColor");
}

// grab inputs from session storage
if (sessionStorage.name) {
  nameInput.value = sessionStorage.name;
}
if (sessionStorage.email) {
  emailInput.value = sessionStorage.email;
}
if (sessionStorage.number) {
  numberInput.value = sessionStorage.number;
}
if (sessionStorage.date) {
  dateInput.value = sessionStorage.date;
}

// set inputs to session storage
nameInput.addEventListener("keyup", event => {
  sessionStorage.setItem("name", event.target.value);
});
emailInput.addEventListener("keyup", event => {
  sessionStorage.setItem("email", event.target.value);
});
numberInput.addEventListener("keyup", event => {
  sessionStorage.setItem("number", event.target.value);
});
dateInput.addEventListener("keyup", event => {
  sessionStorage.setItem("date", event.target.value);
});


// Submitting the form
form.addEventListener("submit", (event) => {
  sessionStorage.setItem("name", nameInput.value);
  sessionStorage.setItem("email", emailInput.value);
  sessionStorage.setItem("number", numberInput.value);
  sessionStorage.setItem("date", dateInput.value);
  validateForm();
  const errorElementRemoveBtn = document.querySelectorAll(".error-delete");
  errorElementRemoveBtn.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      removeBtn.parentElement.classList.add("display-n");
    });
  });
  if (isFormValid()) {
    firstSquare.querySelector("span").classList.add("display-n");
    firstSquare.querySelector("img").classList.add("display-y");
    sessionStorage.setItem("active", "secondTrue");
    window.location.href = "form2.html";
  } else {
    event.preventDefault();
    firstSquare.querySelector("img").classList.remove("display-y");
    firstSquare.querySelector("span").classList.remove("display-n");
  }
});

function isFormValid() {
  const inputContainers = document.querySelectorAll(".input-group");
  let valid = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      valid = false;
    }
  });
  return valid;
}

function validateForm() {
  errors = [];
  errorsElement.innerHTML = ``;
  // Name
  if (nameInput.value.trim() === "") {
    setError(nameInput, "Invalid Name", "Please enter a name");
  } else if (nameInput.value.trim().length < 2) {
    setError(nameInput, "Invalid Name", "Name should contain at least 2 characters");
  } else {
    setSuccess(nameInput);
  }
  sessionStorage.setItem("name", nameInput.value);

  // Email
  if (emailInput.value.trim() == "") {
    setError(emailInput, "Invalid email", "Provide enter email address");
  } else if (validateEmail(emailInput.value)) {
    setSuccess(emailInput);
  } else {
    setError(emailInput, "Invalid email", "Email must be in redberry format");
  }
  sessionStorage.setItem("email", emailInput.value);

  // Number
  if (numberInput.value.trim() == "") {
    setError(numberInput, "Invalid Number", "Provide phone number");
  } else if (!validateNumber(numberInput.value)) {
    setError(
      numberInput,
      "Invalid Number",
      "Please provide valid phone number"
    );
  } else {
    setSuccess(numberInput);
  }
  sessionStorage.setItem("number", numberInput.value);

  // Date
  if (dateInput.value.trim() == "") {
    setError(dateInput, "Invalid Date", "Please enter valid date");
  } else {
    setSuccess(dateInput);
  }

  sessionStorage.setItem("date", dateInput.value);
  for (const [reason, message] of Object.entries(errors)) {
    errorsElement.innerHTML += `
    <div class="err">
    <img src="./media/second_page/Vectoreroor.svg" class="error-svg">
    <p class="invalid">${reason}</p>
    <img src="./media/second_page/Vectordelete.svg" class="error-delete">
    <div class="error-stroke"></div>
    <p class="error-message">${message}</p>
  </div>
    `;
  }
}

// Sets error class on an element and defines error message
function setError(element, errorReason, errorMessage) {
  const parent = element.parentElement;
  parent.classList.add("error");
  parent.classList.remove("success");
  errors[errorReason] = errorMessage;
}

function setSuccess(element) {
  const parent = element.parentElement;
  parent.classList.remove("error");
  parent.classList.add("success");
}

function validateEmail(email) {
  let re = /@redberry.ge\s*$/i;
  let reTwo =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email) && reTwo.test(email);
}

function validateNumber(number) {
    let re = /^\d+$/;
    return re.test(number) && number.length == 9;
}
