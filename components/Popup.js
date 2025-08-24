export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);

    //Método privado para cerrar con ESC
    this._handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };

    //Método privado cerrar al dar click por fuera del popup
    this._handleClickOutside = (evt) => {
      if (evt.target === this.popupElement) {
        this.close();
      }
    };
  }

  //Método abierto para abrir popup
  //Se agrega la clase al popup para ser visible
  open() {
    this.popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //Método abierto para cerrar popup
  //Se elimina clase
  close() {
    this.popupElement.classList.remove("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    //Cerrar con botón
    const closeBtn = this.popupElement.querySelector(".popup__button-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    this.popupElement.addEventListener("mousedown", this._handleClickOutside);
  }
}
