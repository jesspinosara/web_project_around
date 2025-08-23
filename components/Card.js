import { openPopup } from "./Utils.js";
const templateCard = document.querySelector(".template-card");

export class Card {
  constructor(link, title) {
    this.link = link;
    this.title = title;
  }

  openPopup(popup) {
    popup.classList.add("popup_opened");
  }

  getElement() {
    this.templateCard = document.querySelector(".template-card");
    this.clonedCard = this.templateCard.content
      .querySelector(".card")
      .cloneNode(true);

    this.cardTitle = this.clonedCard.querySelector(".card__title");
    this.cardTitle.textContent = this.title;
    this.cardImage = this.clonedCard.querySelector(".card__image");
    this.cardImage.src = this.link;
    this.cardLikeButton = this.clonedCard.querySelector(".card__like-button");
    this.cardTrashButton = this.clonedCard.querySelector(".card__button-trash");

    this.cardLikeButton.addEventListener("click", () => {
      this.cardLikeButton.classList.toggle("card__like-button_active");
    });

    this.cardTrashButton.addEventListener("click", () => {
      this.clonedCard.remove();
    });

    const popupImage = document.querySelector(".popup_image");
    const popupImageElement = popupImage.querySelector(".popup__photo");
    const popupImageCaption = popupImage.querySelector(".popup__caption");
    const popupImageClose = popupImage.querySelector(
      ".popup__button-close_image"
    );

    this.cardImage.addEventListener("click", () => {
      popupWithImage.open({
        link: this.link,
        title: this.title,
      });
      //this.openPopup(popupImage);

      popupImageClose.addEventListener("click", () => {
        popupImage.classList.remove("popup_opened");
      });

      return this.clonedCard;
    });
  }
}
