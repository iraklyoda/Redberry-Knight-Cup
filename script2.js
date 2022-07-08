let params = new URLSearchParams(location.search);

// if(!params.get('name')){
//   window.location.href = "./form.html";
// }

// Const variables
console.log(sessionStorage);
const inputs = document.querySelectorAll(".input-group");
const secondSquare = document.querySelector(".second");

const errorsElement = document.querySelector("#errors");
const form = document.querySelector("#create-account-form");
const levels = document.getElementsByName("experience_level");
const characters = document.getElementsByName("character_id");
const championships = document.getElementsByName("already_participated");
const selectedLevel = document.querySelector(".selected-level");
const radioInput = document.querySelector(".radio-input");
const radioInputs = document.querySelectorAll(".radio-input");
const headerFour = document.querySelector("h4.second-step");
const optionsContainerLevel = document.querySelector(
  ".options-container-level"
);

const selectedCharacter = document.querySelector(".selected-character");
const optionsContainerCharacter = document.querySelector(
  ".options-container-character"
);
const optionsListCharacter = document.querySelectorAll(".option-character");
const optionsListLevel = document.querySelectorAll(".option-level");

let errors = {};


levels.forEach(level => {
  level.addEventListener("click", () => {
    changeHeader();
  })
});
characters.forEach(level => {
  level.addEventListener("click", () => {
    changeHeader();
  })
});
championships.forEach(level => {
  level.addEventListener("click", () => {
    changeHeader();
  })
});


function changeHeader() {
  if (
    checkRadios(characters) &&
    checkRadios(levels) &&
    checkRadios(championships)
  ) {
    headerFour.innerHTML = `Almost Done!`;
  }
}

if (sessionStorage.actives == "trueFirst") {
  secondSquare.classList.add("greenColor");
}

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    secondSquare.classList.add("greenColor");
    sessionStorage.setItem("actives", "trueFirst");
  });
});


form.addEventListener("submit", (event) => {
  validateForm();
  const errorElementRemoveBtn = document.querySelectorAll(".error-delete");
  errorElementRemoveBtn.forEach((removeBtn) => {
    removeBtn.addEventListener("click", () => {
      console.log("cekva");
      removeBtn.parentElement.classList.add("display-n");
    });
  });
  if (isFormValid()) {
    form.submit();
  } else {
    event.preventDefault();
  }
});

function validateForm() {
  errors = [];
  errorsElement.innerHTML = ``;
  // Categories
  if (!checkRadios(levels)) {
    setError(selectedLevel, "categories", "Pls choose category");
  } else {
    setSuccess(selectedLevel);
  }

  if (!checkRadios(characters)) {
    setError(selectedCharacter, "characters", "Pls choose character");
  } else {
    setSuccess(selectedCharacter);
  }

  if (!checkRadios(championships)) {
    setError(radioInput, "yes-or-no", "pls choose yes or no");
  } else {
    setSuccess(radioInput);
  }

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

function checkRadios(radios) {
  checked = false;
  radios.forEach((radio) => {
    if (radio.checked) {
      checked = true;
    }
  });
  return checked;
}

// Custom selects

selectedLevel.addEventListener("click", () => {
  optionsContainerLevel.classList.toggle("active");
});

optionsListLevel.forEach((option) => {
  option.addEventListener("click", () => {
    selectedLevel.innerHTML = option.querySelector("label").innerHTML;
    option.querySelector("input").checked = true;
    optionsContainerLevel.classList.remove("active");
  });
});

// For characters

selectedCharacter.addEventListener("click", () => {
  optionsContainerCharacter.classList.toggle("active");
});

optionsListCharacter.forEach((option) => {
  option.addEventListener("click", () => {
    selectedCharacter.innerHTML = option.querySelector("label").innerHTML;
    option.querySelector("input").checked = true;
    optionsContainerCharacter.classList.remove("active");
  });
});

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
