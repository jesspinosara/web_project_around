import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this.popupElement.querySelector(
      ".popup__button-submit"
    );
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
}
