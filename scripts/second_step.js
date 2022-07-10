// Const variables
// Inputs
const inputs = document.querySelectorAll(".input-group");
const selectedLevel = document.querySelector(".selected-level");
const selectedCharacter = document.querySelector(".selected-character");
const selected = document.querySelectorAll(".selected");
const levels = document.getElementsByName("experience_level");
const characters = document.getElementsByName("character_id");
const radioInput = document.querySelector(".radio-input");
const radioInputs = document.querySelectorAll(".radio-input");
const optionsContainerCharacter = document.querySelector(
  ".options-container-character"
);
const optionsListCharacter = document.querySelectorAll(".option-character");
const optionsListLevel = document.querySelectorAll(".option-level");
const championships = document.getElementsByName("already_participated");
const optionsContainerLevel = document.querySelector(
  ".options-container-level"
);

// Form Elements
const secondSquare = document.querySelector(".second");
const errorsElement = document.querySelector("#errors");
const form = document.querySelector("#create-account-form");
const headerFour = document.querySelector("h4.second-step");

console.log(sessionStorage);

// Variables
let errors = {};

if (sessionStorage.character_id && sessionStorage.experience_level) {
  headerFour.innerHTML = `Almost Done!`;
}

optionsListLevel.forEach((level) => {
  level.addEventListener("click", () => {
    changeHeader();
  });
});
characters.forEach((level) => {
  level.addEventListener("click", () => {
    changeHeader();
  });
});

function changeHeader() {
  if (checkRadios(characters) && checkRadios(levels)) {
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
    event.preventDefault();
    let participated = "";
    if (sessionStorage.already_participated == "true") {
      participated = true;
    } else {
      participated = false;
    }
    console.log(participated);

    fetch("https://chess-tournament-api.devtest.ge/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: sessionStorage.name,
        email: sessionStorage.email,
        phone: sessionStorage.number,
        date_of_birth: sessionStorage.date,
        experience_level: sessionStorage.experience_level,
        already_participated: participated,
        character_id: sessionStorage.character_id,
      }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response.status);
        if (response.status === 201) {
          setTimeout(() => {
            window.location.href = "thanks.html";
          }, 5000);
        }
        return response.text();
      })
      .then(function (text) {
        console.log(text);
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    event.preventDefault();
  }
});

function validateForm() {
  errors = [];
  errorsElement.innerHTML = ``;
  // Categories
  // Levels
  if (!checkRadios(levels)) {
    setError(selectedLevel, "level of knowledge", "pick your knowledge level");
  } else {
    setSuccess(selectedLevel);
    sessionStorage.setItem("experience_level", checkRadios(levels));
  }

  // Characters
  if (!checkRadios(characters)) {
    setError(selectedCharacter, "Choose your character", "pick your character");
  } else {
    setSuccess(selectedCharacter);
    sessionStorage.setItem("character_id", checkRadios(characters));
  }
  sessionStorage.setItem("already_participated", checkRadios(championships));

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
      checked = radio.value;
    }
  });
  return checked;
}

// Custom selects

// Player Experience

// Stay after refresh
if (sessionStorage.experience_level) {
  const id = sessionStorage.experience_level;
  const option = document.getElementById(id).parentElement;
  const parent = selectedLevel.parentElement;
  parent.classList.remove("error");
  selectedLevel.innerHTML = option.querySelector("label").innerHTML;
  option.querySelector("input").checked = true;
  optionsContainerLevel.classList.remove("active");
}

selectedLevel.addEventListener("click", () => {
  optionsContainerLevel.classList.toggle("active");
});

optionsListLevel.forEach((option) => {
  option.addEventListener("click", () => {
    const parent = selectedLevel.parentElement;
    parent.classList.remove("error");
    console.log(option);
    selectedLevel.innerHTML = option.querySelector("label").innerHTML;
    option.querySelector("input").checked = true;
    sessionStorage.setItem(
      "experience_level",
      option.querySelector("input").id
    );
    optionsContainerLevel.classList.remove("active");
  });
});

// Character Selector

if (sessionStorage.characterName) {
  selectedCharacter.innerHTML = sessionStorage.characterName;
}

fetch("https://chess-tournament-api.devtest.ge/api/grandmasters")
  .then((response) => response.json())
  .then((charactersData) => {
    const characterOptions = document.querySelector("#options-characters");
    const totalP = document.querySelector(".characters-total");
    totalP.innerHTML = `(Total ${charactersData.length})`;
    charactersData.forEach((character) => {
      characterOptions.innerHTML += `
      <div class="option option-character">
      <input
        type="radio"
        class="radio"
        id="${character.id}"
        value="${character.id}"
        name="character_id"
      />
      <label for="${character.id}">${character.name}</label>
      <img class="character-img" src="https://chess-tournament-api.devtest.ge/${character.image}" alt="${character.name}">
    </div>
      `;
    });
    const selectedCharacter = document.querySelector(".selected-character");
    const optionsContainerCharacter = document.querySelector(
      ".options-container-character"
    );
    const optionsListCharacter = document.querySelectorAll(".option-character");
    selectedCharacter.addEventListener("click", () => {
      optionsContainerCharacter.classList.toggle("active");
    });

    // If character is already selected before refresh
    if (sessionStorage.character_id) {
      const id = sessionStorage.character_id;
      const option = document.getElementById(id).parentElement;
      console.log(option);
      const parent = selectedLevel.parentElement;
      parent.classList.remove("error");
      selectedCharacter.innerHTML = option.querySelector("label").innerHTML;
      option.querySelector("input").checked = true;
      sessionStorage.setItem(
        "characterName",
        option.querySelector("label").innerHTML
      );
      optionsContainerLevel.classList.remove("active");
    }

    if (sessionStorage.character_id && sessionStorage.experience_level) {
      headerFour.innerHTML = `Almost Done!`;
    }

    optionsListCharacter.forEach((option) => {
      option.addEventListener("click", () => {
        const parent = selectedCharacter.parentElement;
        parent.classList.remove("error");
        selectedCharacter.innerHTML = option.querySelector("label").innerHTML;
        option.querySelector("input").checked = true;
        console.log(option);
        sessionStorage.setItem(
          "character_id",
          option.querySelector("input").id
        );
        sessionStorage.setItem(
          "characterName",
          option.querySelector("label").innerHTML
        );
        optionsContainerCharacter.classList.remove("active");
      });
    });
    optionsListCharacter.forEach((level) => {
      level.addEventListener("click", () => {
        changeHeader();
      });
    });
  })
  .catch((e) => {
    console.log(e);
  });

// Participation

// Stay after refresh
if (sessionStorage.already_participated) {
  const id = sessionStorage.already_participated;
  const option = document.getElementById(id).parentElement;
  option.querySelector("input").checked = true;
}

radioInputs.forEach((option) => {
  option.addEventListener("click", () => {
    option.querySelector("input").checked = true;
    sessionStorage.setItem(
      "already_participated",
      option.querySelector("input").id
    );
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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
