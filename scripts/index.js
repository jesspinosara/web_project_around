const form = document.querySelector(".popup__form");
const inputName = document.querySelector(".popup__input_name");
const inputHobbie = document.querySelector(".popup__input_hobbie");
const infName = document.querySelector(".profile__info_name");
const infHobbie = document.querySelector(".profile__info_hobbie");
const editButton = document.querySelector(".profile__info_edit-button");
const closeButton = document.querySelector(".popup__button_close");
const popup = document.querySelector(".popup");
const likeButtons = document.querySelectorAll(".card__like-button");

function openWindow() {
  inputName.value = "";
  inputHobbie.value = "";
  popup.classList.add("popup_opened");
}

function saveInfo(evt) {
  evt.preventDefault();
  infName.textContent = inputName.value.trim();
  infHobbie.textContent = inputHobbie.value.trim();
  closeWindow();
}

function closeWindow() {
  popup.classList.remove("popup_opened");
}

form.addEventListener("submit", saveInfo);
closeButton.addEventListener("click", closeWindow);
editButton.addEventListener("click", openWindow);

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("card__like-button_active");
  });
});
