import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this.formElement = this.popupElement.querySelector(".popup__form");
    this._submitButton = this.formElement.querySelector(
      ".popup__button-submit"
    );
    this._defaultText = this._submitButton.textContent;
  }

  //Método privado que obtiene valores de inputs
  _getInputValues() {
    const data = {};
    const inputList = this.formElement.querySelectorAll(".popup__input");
    inputList.forEach((input) => {
      data[input.id] = input.value; //Lista de inputs y se guarda el valor en id del input
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners(); //botón cerrar y click

    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.formElement.reset();
  }

  renderLoading(isLoading, loadingText = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._defaultText;
    }
  }
}
