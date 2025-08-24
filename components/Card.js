export class Card {
  constructor(link, title, handleCardClick) {
    this.link = link;
    this.title = title;
    this.handleCardClick = handleCardClick;
  }

  getElement() {
    this.clonedCard = document
      .querySelector(".template-card")
      .content.querySelector(".card")
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

    // Evento para abrir popup con imagen
    this.cardImage.addEventListener("click", () => {
      this.handleCardClick(this.link, this.title);
    });

    return this.clonedCard;
  }
}
