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

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._showInputError(input);
        this._validateButton();
      });
    });

    this._validateButton();
  }

  _showInputError(input) {
    const spanElement = this.form.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      spanElement.textContent = input.validationMessage;
      spanElement.classList.add(this.settings.inputErrorClass);
    } else {
      spanElement.textContent = "";
      spanElement.classList.remove(this.settings.inputErrorClass);
    }
  }

  _validateButton() {
    if (this._checkInputsValidity()) {
      this.buttonElement.classList.add(this.settings.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }

  _checkInputsValidity() {
    return this.inputList.some((input) => !input.validity.valid);
  }
}
