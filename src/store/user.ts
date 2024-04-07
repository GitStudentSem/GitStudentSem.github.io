import { makeAutoObservable } from "mobx";

class User {
  name: string;
  isAuth: boolean;

  constructor() {
    this.name = "";
    this.isAuth = false;

    makeAutoObservable(this);
  }
  async login(name: string) {
    this.name = name;
    this.isAuth = true;
  }
  logout() {
    this.name = "";
    this.isAuth = false;
    console.log("3", 3);
  }
  getIsAuth() {
    return this.isAuth;
  }
}

export const UserStore = new User();
