import { makeAutoObservable } from "mobx";

class User {
  name = "";
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }
  async login(name) {
    this.name = name;
    this.isAuth = true;
  }
  logout() {
    this.name = "";
    this.isAuth = false;
  }
  getIsAuth() {
    return this.isAuth;
  }
}

export default new User();
