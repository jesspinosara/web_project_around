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
const templateCard = document.querySelector(".template-card");
const cardsGrid = document.querySelector(".cards__grid");

//Lista de tarjetas
const initialCards = [
  {
    title: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    title: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    title: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    title: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

//Crear tarjeta nueva

function createCard(title, link) {
  const clonedCard = templateCard.content
    .querySelector(".card")
    .cloneNode(true);
  console.log(clonedCard);

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

  console.log(cardTrashButton);
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

function resetForm() {
  document.querySelector(".popup__title").textContent = "Editar perfil";
  document.querySelector(".popup__button-submit").textContent = "Guardar";
  document.querySelector(".popup__input_name").placeholder = "Nombre";
  document.querySelector(".popup__input_hobbie").placeholder = "Acerca de mí";
}

//Insertar todas la tarjetas iniciales
initialCards.forEach(function (item) {
  createCard(item.title, item.link);
});

//Abrir popup profile
const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__info_edit-button");
editButton.addEventListener("click", () => {
  resetForm();
  const inputName = document.querySelector(".popup__input_name");
  const inputHobbie = document.querySelector(".popup__input_hobbie");
  inputName.value = "";
  inputHobbie.value = "";
  openPopup(popup);
});

//Abrir popup card
const addCardButton = document.querySelector(".profile__info_add-button");
addCardButton.addEventListener("click", () => {
  document.querySelector(".popup__title").textContent = "Nuevo lugar";
  document.querySelector(".popup__button-submit").textContent = "Crear";
  const inputTitle = document.querySelector(".popup__input_name");
  const inputLink = document.querySelector(".popup__input_hobbie");
  inputTitle.placeholder = "Título";
  inputTitle.value = "";
  inputLink.placeholder = "Enlace a la imagen";
  inputLink.value = "";
  openPopup(popup);
});

//Cerrar popup
function closeWindow() {
  closePopup(popup);
}

//Guardar cambios
const form = document.querySelector(".popup__form");
const closeButton = document.querySelector(".popup__button-close");
form.addEventListener("submit", (evt) => {
  const titleContent = document.querySelector(".popup__title").textContent;
  if (titleContent === "Editar perfil") {
    console.log("Guardando datos del perfil!");
    const infName = document.querySelector(".profile__info_name");
    const infHobbie = document.querySelector(".profile__info_hobbie");
    evt.preventDefault();
    infName.textContent = document
      .querySelector(".popup__input_name")
      .value.trim();
    infHobbie.textContent = document
      .querySelector(".popup__input_hobbie")
      .value.trim();
  } else if (titleContent == "Nuevo lugar") {
    console.log("Guardando datos de la carta!");
    evt.preventDefault();
    const title = document.querySelector(".popup__input_name").value.trim();
    const link = document.querySelector(".popup__input_hobbie").value.trim();
    createCard(title, link);
    resetForm();
  }
  closeWindow();
});
closeButton.addEventListener("click", closeWindow);
