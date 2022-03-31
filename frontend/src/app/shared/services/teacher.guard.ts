import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

import {User} from "../models/user.model";
import {CurrentUserService} from "./currentUser.service";


@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private router: Router,
              private currentUserService: CurrentUserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user: User = this.currentUserService.get();
    if (user.isTeacher) {
      return true;
    } else {
      this.router.navigate(['/system', 'courses']);
      return false;
    }
  }
}
