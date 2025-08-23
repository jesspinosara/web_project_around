import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.popupImage = this.popupElement.querySelector(".popup__photo");
    this.popupCaption = this.popupElement.querySelector(".popup__caption");
  }

  open({ link, title }) {
    super.open(); //Se usa el open() del padre
    this.popupImage.src = link;
    this.popupImage.alt = title;
    this.popupCaption.textContent = title;
  }
}
