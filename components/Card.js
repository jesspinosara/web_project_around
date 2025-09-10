export class Card {
  constructor(
    data,
    currentUserId,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner?._id || data.owner;
    this._currentUserId = currentUserId;

    this._isLiked =
      (data.isLiked ??
        data.likes?.some((user) => user._id === currentUserId)) ||
      false;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // método para clonar el template
  getElement() {
    this._element = document
      .querySelector(".template-card")
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._deleteButton = this._element.querySelector(".card__button-trash");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    this._updateLike();

    return this._element;
  }

  _setEventListeners() {
    //Dar like/unlike
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this.isLiked(), this);
    });

    // abrir popup de confirmación antes de borrar
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });

    // abrir popup de imagen
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  isLiked() {
    return this._isLiked;
  }

  updateIsLiked(newState) {
    this._isLiked = newState;
    this._updateLike();
  }

  _updateLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
}
