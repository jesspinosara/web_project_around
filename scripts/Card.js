const templateCard = document.querySelector(".template-card");

export class Card {
  constructor(link, title) {
    this.link = link;
    this.title = title;
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

    return this.clonedCard;
  }
}
