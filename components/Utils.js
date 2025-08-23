export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// General cerrar con Esc
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
//General cerrar click afuera
export function closePopupClickOut(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
}
