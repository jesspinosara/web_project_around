//Se encarga de leer y presentar la información del usuario en DOM
export default class UserInfo {
  constructor({ nameSelector, hobbieSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._hobbieElement = document.querySelector(hobbieSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  //Método público que devuelve objeto con la info del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobbie: this._hobbieElement.textContent,
      avatar: this._avatarElement ? this._avatarElement.src : "",
    };
  }

  //Método público que toma los datos del nuevo usuario y los agrega al DOM
  setUserInfo({ name, hobbie, avatar }) {
    this._nameElement.textContent = name;
    this._hobbieElement.textContent = hobbie;
    this._avatarElement.src = avatar;
  }
}
