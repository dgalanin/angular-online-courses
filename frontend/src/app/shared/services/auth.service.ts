import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {User} from "../models/user.model";
import {CurrentUserActions} from "../../Store/currentUser/currentUser.actions";

@Injectable()
export class AuthService {
  constructor(private store: Store) {
  }
  private isAuthenticated = false;

  login(user: User) {
    this.isAuthenticated = true;
    this.store.dispatch(CurrentUserActions.set(user));
  }

  logout() {
    this.isAuthenticated = false;
    this.store.dispatch(CurrentUserActions.reSet());
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
