import { makeAutoObservable } from "mobx";

class User {
  name = "";
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }
  login(name) {
    this.name = name;
    this.isAuth = true;
  }
  logout() {
    this.name = "";
    this.isAuth = false;
  }
}

export default new User();
