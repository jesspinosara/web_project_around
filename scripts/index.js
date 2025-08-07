import { Card } from "./Card.js";

// Selección global, fuera de la función
const popupImage = document.querySelector(".popup_image");
const popupImageElement = popupImage.querySelector(".popup__photo");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupImageClose = popupImage.querySelector(".popup__button-close_image");

//Cerrar popup de la imagen
popupImageClose.addEventListener("click", () => {
  closePopup(popupImage);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Cards
const initialCards = [
  new Card(
    "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    "Valle de Yosemite"
  ),
  new Card(
    "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    "Lago Louise"
  ),
  new Card(
    "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    "Montañas Calvas"
  ),
  new Card(
    "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    "Latemar"
  ),
  new Card(
    "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    "Parque Nacional de la Vanoise"
  ),
  new Card(
    "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    "Lago di Braies"
  ),
];
//Insertar todas la tarjetas iniciales
const cardsGrid = document.querySelector(".cards__grid");
initialCards.forEach(function (card) {
  cardsGrid.append(card.getElement());
});

//Crear tarjeta nueva
function createCard(title, link) {
  const templateCard = document.querySelector(".template-card");
  const clonedCard = templateCard.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitle = clonedCard.querySelector(".card__title");
  const cardImage = clonedCard.querySelector(".card__image");
  const cardLikeButton = clonedCard.querySelector(".card__like-button");
  const cardTrashButton = clonedCard.querySelector(".card__button-trash");

  cardTitle.textContent = title;
  cardImage.src = link;

  //Activar y desactivar like button
  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardTrashButton.addEventListener("click", function () {
    clonedCard.remove();
  });

  cardImage.addEventListener("click", () => {
    popupImageElement.src = link;
    popupImageElement.alt = title;
    popupImageCaption.textContent = title;
    openPopup(popupImage);
  });

  cardsGrid.append(clonedCard);
}

// Contact
// Cerrar popups contact
const popupContact = document.getElementById("popup_contact");
const popupContactClose = popupContact.querySelector(".popup__button-close");
popupContactClose.addEventListener("click", () => {
  closePopup(popupContact);
});

//Abrir popup profile
const editButton = document.querySelector(".profile__info_edit-button");
editButton.addEventListener("click", () => {
  const inputName = document.querySelector(".popup__input_name");
  const inputHobbie = document.querySelector(".popup__input_hobbie");
  inputName.value = "";
  inputHobbie.value = "";
  openPopup(popupContact);
});

//Guardar cambios
const formContact = document.getElementById("contact_form");
const closeContactButton = document.querySelector(".popup__button-close");
formContact.addEventListener("submit", (evt) => {
  // profile
  const infName = document.querySelector(".profile__info_name");
  const infHobbie = document.querySelector(".profile__info_hobbie");
  evt.preventDefault();
  infName.textContent = document
    .querySelector(".popup__input_name")
    .value.trim();
  infHobbie.textContent = document
    .querySelector(".popup__input_hobbie")
    .value.trim();
  closePopup(popupContact);
});

// Card
// Cerrar popups card
const popupCard = document.getElementById("popup_card");
const popupCardClose = popupCard.querySelector(".popup__button-close");
popupCardClose.addEventListener("click", () => {
  closePopup(popupCard);
});

//Abrir popup card
const addCardButton = document.querySelector(".profile__info_add-button");
addCardButton.addEventListener("click", () => {
  const inputTitle = document.querySelector(".popup__input_title");
  const inputLink = document.querySelector(".popup__input_link");
  inputTitle.value = "";
  inputLink.value = "";
  openPopup(popupCard);
});

//Guardar cambios
const formCard = document.getElementById("place_form");
const closeCardButton = document.querySelector(".popup__button-close");
formCard.addEventListener("submit", (evt) => {
  // card
  evt.preventDefault();
  const title = document.querySelector(".popup__input_title").value.trim();
  const link = document.querySelector(".popup__input_link").value.trim();
  createCard(title, link);
  closePopup(popupCard);
});

// General cerrar con Esc

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

// Cerrar con clic fuera del contenedor
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});
