export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
  }

  //Método abierto para abrir popup
  //Se agrega la clase al popup para ser visible
  open() {
    this.popupElement.classList.add("popup_opened");
  }

  //Método abierto para cerrar popup
  //Se elimina clase
  close() {
    this.popupElement.classList.remove("popup_opened");
  }

  //Método privado para cerrar con ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Método privado cerrar al dar click por fuera del popup
  _handleClickOutside(evt) {
    if (evt.target === this.popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    //Cerrar con botón
    this.popupElement
      .querySelector(".popup__button-close")
      .addEventListener("click", () => {
        this.close();
      });
    /*
    this.btnClosePopup = this.popupElement.querySelector(
      ".popup__button-close"
    );
    this.btnClosePopup.addEventListener("click", () => {
      this.close();
    });*/
  }
}
