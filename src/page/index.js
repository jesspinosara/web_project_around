import { Card } from "../../components/Card.js";
import Section from "../../components/Section.js";
import PopupWithImage from "../../components/PopupWithImage.js";
import PopupWithForm from "../../components/PopupWithForm.js";
import UserInfo from "../../components/UserInfo.js";
import { FormValidator } from "../../components/FormValidator.js";
import Api from "../../components/Api.js";
import PopupWithConfirmation from "../../components/PopupWithConfirmation.js";

const token = "e35a5dc9-2577-45c7-8929-87431e3d4a32";

//Instancia API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "e35a5dc9-2577-45c7-8929-87431e3d4a32",
    "Content-Type": "application/json",
  },
});

//Instancia User Info
const userProfile = new UserInfo({
  nameSelector: ".profile__info_name",
  hobbieSelector: ".profile__info_hobbie",
  avatarSelector: ".profile__avatar",
});

//Instancia Popup Image
const popupWithImage = new PopupWithImage("#popup_image");
popupWithImage.setEventListeners();

// Instancia del confirm popup
const popupConfirm = new PopupWithConfirmation("#popup_confirm");
popupConfirm.setEventListeners();

//instancia para agregar Sección
const cardsSection = new Section(
  {
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".cards__grid"
);

//Función para crear tarjetas
function createCard(data) {
  const card = new Card(
    data,
    currentUserId,
    //abrir imagen
    (link, name) => popupWithImage.open(link, name),
    //eliminar tarjeta
    (cardId, cardElement) => {
      popupConfirm.open();
      popupConfirm.setSubmitAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            popupConfirm.close();
          })
          .catch((err) => console.log("Error eliminando tarjeta:", err));
      });
    },

    //dar y quitar like
    (cardId, isLiked, cardInstance) => {
      const apiMethod = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

      apiMethod
        .then((updatedCard) => {
          // actualizar con el booleano devuelto
          cardInstance.updateIsLiked(updatedCard.isLiked);
        })
        .catch((err) => console.log("Error en like/unlike:", err));
    }
  );

  return card.getElement();
}

let currentUserId;
//Cargar usuario y tarjetas
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    currentUserId = userData._id;

    userProfile.setUserInfo({
      name: userData.name,
      hobbie: userData.about,
      avatar: userData.avatar,
    });

    cardsSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log("Error al cargar datos iniciales:", err);
  });

//Popup Profile: editar nombre y hobbie
const popupProfile = new PopupWithForm("#popup_contact", (data) => {
  popupProfile.renderLoading(true);
  api
    .updateUserInfo({ name: data.name, about: data.hobbie })
    .then((updatedUser) => {
      userProfile.setUserInfo({
        name: updatedUser.name,
        hobbie: updatedUser.about,
        avatar: updatedUser.avatar,
      });
      popupProfile.close();
    })
    .catch((err) => console.log("Error al actualizar perfil", err))
    .finally(() => popupProfile.renderLoading(false));
});
popupProfile.setEventListeners();

//Popup Profile: editar avatar
const popupAvatar = new PopupWithForm("#popup_avatar", (data) => {
  popupAvatar.renderLoading(true);
  api
    .updateAvatar({ avatar: data.avatar })
    .then((updatedUser) => {
      userProfile.setUserInfo({
        name: updatedUser.name,
        hobbie: updatedUser.about,
        avatar: updatedUser.avatar,
      });
      popupAvatar.close();
    })
    .catch((err) => console.log("Error al actualizar perfil", err))
    .finally(() => popupAvatar.renderLoading(false));
});
popupAvatar.setEventListeners();

//Abrir popup de perfil con datos actuales
document
  .querySelector(".profile__info_edit-button")
  .addEventListener("click", () => {
    const updatedUser = userProfile.getUserInfo();
    document.querySelector("#name").value = updatedUser.name;
    document.querySelector("#hobbie").value = updatedUser.hobbie;
    document.querySelector("#avatar").value = updatedUser.avatar;
    popupProfile.open();
  });

const avatarEditBtn = document.querySelector(".profile__avatar-edit");
avatarEditBtn.addEventListener("click", () => {
  popupAvatar.open();
});

//Popup AddCard: Añade nuevas cartas
const popupAddCard = new PopupWithForm("#popup_card", (data) => {
  popupAddCard.renderLoading(true);
  api
    .addCard({ name: data.title, link: data.link })
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardsSection.addItem(cardElement);
      popupAddCard.close();
    })
    .catch((err) => console.log("Error al añadir tarjeta", err))
    .finally(() => popupAddCard.renderLoading(false));
});
popupAddCard.setEventListeners();

//Botón de añadir tarjeta
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
