import { Card } from "./Card.js";
import {
  openPopup,
  closePopup,
  closePopupClickOut,
  closePopupEsc,
} from "./Utils.js";
import { FormValidator } from "./FormValidator.js";

//Tarjetas/Cartas
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

// PopupPerfil
const popupContact = document.getElementById("popup_contact");
const popupContactClose = popupContact.querySelector(".popup__button-close");
const editButton = document.querySelector(".profile__info_edit-button");

editButton.addEventListener("click", () => {
  const inputName = document.querySelector(".popup__input_name");
  const inputHobbie = document.querySelector(".popup__input_hobbie");
  inputName.value = "";
  inputHobbie.value = "";
  openPopup(popupContact);
});

popupContactClose.addEventListener("click", () => {
  closePopup(popupContact);
});

document.getElementById("contact_form").addEventListener("submit", (evt) => {
  evt.preventDefault();
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

//Popup nueva tarjeta
const popupCard = document.getElementById("popup_card");
const addCardButton = document.querySelector(".profile__info_add-button");
const popupCardClose = popupCard.querySelector(".popup__button-close");

addCardButton.addEventListener("click", () => {
  const inputTitle = document.querySelector(".popup__input_title");
  const inputLink = document.querySelector(".popup__input_link");
  inputTitle.value = "";
  inputLink.value = "";
  openPopup(popupCard);
});

popupCardClose.addEventListener("click", () => {
  closePopup(popupCard);
});

document.getElementById("place_form").addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = document.querySelector(".popup__input_title").value.trim();
  const link = document.querySelector(".popup__input_link").value.trim();
  const newCard = new Card(link, title);
  cardsGrid.append(newCard.getElement());
  closePopup(popupCard);
});

document.addEventListener("keydown", closePopupEsc);
document
  .querySelectorAll(".popup")
  .forEach((popup) => closePopupClickOut(popup));
