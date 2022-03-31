import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {CurrentUserService} from "./currentUser.service";

@Injectable()
export class AuthService {
  constructor(private currentUserService: CurrentUserService) {
  }

  private isAuthenticated = false;

  login(user: User) {
    this.isAuthenticated = true;
    this.currentUserService.set(user);
  }

  logout() {
    this.isAuthenticated = false;
    this.currentUserService.reSet();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
