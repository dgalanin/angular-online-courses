import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {User} from "../models/user.model";
import {CurrentUserSelectors} from "../../Store/currentUser/currentUser.selectors";
import {CurrentUserActions} from "../../Store/currentUser/currentUser.actions";
import {Course} from "../models/course.model";
import {Observable} from "rxjs";

@Injectable()
export class CurrentUserService {
  constructor(private store: Store) {
  }

  get(): Observable<User> {
    return this.store.select(CurrentUserSelectors.user);
  }

  set(user: User): void {
    this.store.dispatch(CurrentUserActions.set(user));
  }

  reSet(): void {
    this.store.dispatch(CurrentUserActions.reSet());
  }

  joinToCourse(course: Course): void {
    this.store.dispatch(CurrentUserActions.joinCourse(course));
  }

  leaveFromCourse(course: Course): void {
    this.store.dispatch(CurrentUserActions.leaveCourse(course));
  }

  achieveCourse(course: Course): void {
    this.store.dispatch(CurrentUserActions.achieveCourse(course));
  }
}
