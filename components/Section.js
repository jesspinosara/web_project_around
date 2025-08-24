//Section controla el método de agregar cartas
//(initialCards o new Card al html)
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; //proceso de agregar las cartas al html
    this._cardsContainer = document.querySelector(containerSelector); //elemento en donde agregaré las cartas
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._cardsContainer.prepend(element);
  }
}
