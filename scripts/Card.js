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

    this.cardImage.addEventListener("click", () => {
      popupImageElement.src = link;
      popupImageElement.alt = title;
      popupImageCaption.textContent = title;
      openPopup(popupImage);
    });

    return this.clonedCard;
  }
}
