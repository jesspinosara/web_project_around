export class FormValidator {
  constructor(form, settings) {
    this.form = form;
    this.settings = settings;

    this.inputList = Array.from(
      this.form.querySelectorAll(this.settings.inputSelector)
    );
    this.buttonElement = this.form.querySelector(
      this.settings.submitButtonSelector
    );
  }

  enableValidation(settings) {
    this._setEventListeners();
    this._validateButton();
  }

  _setEventListeners() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._showInputError(input);
        this._validateButton();
      });
    });

    _showInputError(input);
    const spanElement = document.querySelector(`#${input.id}-error`);
    spanElement.textContent = input.validationMessage;
  }

  _validateButton() {
    if (this._checkInputsValidity()) {
      this.buttonElement.classList.add("popup__button-submit-disable");
      this.buttonElement.disabled = false;
    } else {
      this.buttonElement.classList.remove("popup__button-submit-disable");
      this.buttonElement.disabled = true;
    }
  }
  _checkInputsValidity() {
    return this.inputList.some(function (input) {
      return !input.validity.valid;
    });
  }
}

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit-disable",
  inputErrorClass: "span-error",
};
