//Se encarga de leer y presentar la información del usuario en DOM
export default class UserInfo {
  constructor({ nameSelector, hobbieSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._hobbieElement = document.querySelector(hobbieSelector);
  }

  //Método público que devuelve objeto con la info del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobbie: this._hobbieElement.textContent,
    };
  }

  //Método público que toma los datos del nuevo usuario y los agrega al DOM
  setUserInfo({ name, hobbie }) {
    this._nameElement.textContent = name;
    this._hobbieElement.textContent = hobbie;
  }
}
