function enableValidation() {
  const formList = document.querySelectorAll("form");

  formList.forEach(function (form) {
    const inputList = Array.from(form.querySelectorAll("input"));
    setEventListeners(form, inputList);
  });
}

function setEventListeners(form, inputList) {
  const buttonElement = form.querySelector(".popup__button-submit");
  console.log("boton", buttonElement);
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
  inputList.forEach(function (input) {
    input.addEventListener("input", function () {
      showInputError(input);
      validateButton(buttonElement, inputList);
    });
  });
}

function validateButton(buttonElement, inputList) {
  if (checkInputsValidity(inputList)) {
    buttonElement.classList.add("popup__button-submit-disable");
  } else {
    buttonElement.classList.remove("popup__button-submit-disable");
  }
}

function checkInputsValidity(inputList) {
  return inputList.some(function (input) {
    return !input.validity.valid;
  });
}

function showInputError(input) {
  const spanElement = document.querySelector(`#${input.id}-error`);
  spanElement.textContent = input.validationMessage;
}
