// Document Selectors

const inputs = document.querySelectorAll("input");
const firstSquare = document.querySelector(".first");
const secondSquare = document.querySelector(".second");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const numberInput = document.querySelector("#number");
const dateInput = document.querySelector("#date");
const form = document.querySelector("#create-account-form");
const errorsElement = document.querySelector("#errors");
const firstNextBtn = document.querySelector("#first-next-btn");
const secondStepBack = document.querySelector("#second-step-back-btn");

console.log(sessionStorage);

// variables
let errors = {};

// make active square green
if(sessionStorage.active != "secondTrue"){
inputs.forEach((input) => {
  input.addEventListener("click", () => {
    firstSquare.classList.add("greenColor");
    sessionStorage.setItem("active", "firstTrue");
  });
});
}

if (sessionStorage.active == "secondTrue") {
  firstSquare.querySelector("span").classList.add("display-n");
  firstSquare.querySelector("img").classList.add("display-y");
  inputs.forEach(input => {
    input.parentElement.classList.add('success');
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

// functions

form.addEventListener("submit", (event) => {
  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("email", emailInput.value);
  localStorage.setItem("number", numberInput.value);
  localStorage.setItem("date", dateInput.value);
  validateForm();
  const errorElementRemoveBtn = document.querySelectorAll(".error-delete");
  errorElementRemoveBtn.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      console.log("cekva");
      removeBtn.parentElement.classList.add("display-n");
    });
  });
  if (isFormValid()) {
    firstSquare.querySelector("span").classList.add("display-n");
    firstSquare.querySelector("img").classList.add("display-y");
    sessionStorage.setItem("active", "secondTrue");
    form.submit();
  } else {
    // sessionStorage.setItem("active", "firstTrue");
    event.preventDefault();
    firstSquare.querySelector("img").classList.remove("display-y");
    firstSquare.querySelector("span").classList.remove("display-n");
  }
})

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
    setError(nameInput, "Invalid Name", "Please enter a valid name");
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
    setError(emailInput, "Invalid email", "Please enter valid email address");
  }
  sessionStorage.setItem("email", emailInput.value);

  // Number
  if (numberInput.value.trim() == "") {
    setError(numberInput, "Invalid Number", "Provide phone number");
  } else if (numberInput.value.trim().length != 9) {
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
  console.log(errors);
  for (const [reason, message] of Object.entries(errors)) {
    console.log(`${reason}, ${message}`);
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

// Between two steps


