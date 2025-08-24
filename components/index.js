import { Card } from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";

//UserInfo
const userProfile = new UserInfo({
  nameSelector: ".profile__info_name",
  hobbieSelector: ".profile__info_hobbie",
});

//Instancia Popup Image
const popupWithImage = new PopupWithImage("#popup_image");
popupWithImage.setEventListeners();

//instancia para agregar Sección
const cardsSection = new Section(
  {
    renderer: (item) => {
      const card = new Card(item.link, item.title, (link, title) => {
        popupWithImage.open(link, title);
      });
      cardsSection.addItem(card.getElement());
    },
  },
  ".cards__grid"
);

//Tarjetas/Cartas
const initialCards = [
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    title: "Valle de Yosemite",
  },

  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    title: "Lago Louise",
  },

  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    title: "Montañas Calvas",
  },

  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    title: "Latemar",
  },

  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    title: "Parque Nacional de la Vanoise",
  },

  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    title: "Lago di Braies",
  },
];

cardsSection.renderItems(initialCards);

//Se crean las instancias de los diferentes popup
//Popup Profile: modifica el perfil
const popupProfile = new PopupWithForm("#popup_contact", (data) => {
  userProfile.setUserInfo({
    name: data.name,
    hobbie: data.hobbie,
  });
});
popupProfile.setEventListeners();

document
  .querySelector(".profile__info_edit-button")
  .addEventListener("click", () => {
    document.querySelector("#name").value = "";
    document.querySelector("#hobbie").value = "";
    popupProfile.open();
  });

//Popup AddCard: Añade nuevas cartas
const popupAddCard = new PopupWithForm("#popup_card", (data) => {
  console.log(data);

  const card = new Card(data.link, data.title, (link, title) => {
    popupWithImage.open(link, title);
  });
  cardsSection.addItem(card.getElement());
});
popupAddCard.setEventListeners();

//Botón de añadir
document
  .querySelector(".profile__info_add-button")
  .addEventListener("click", () => {
    popupAddCard.open();
  });

//Validación de formularios
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit-disable",
  inputErrorClass: "span-error",
};

// Seleccionar todos los formularios a validar
document.querySelectorAll(settings.formSelector).forEach((form) => {
  const formValidator = new FormValidator(form, settings);
  formValidator.enableValidation();
});
