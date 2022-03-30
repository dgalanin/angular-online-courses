import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {UsersService} from "../../shared/services/users.service";
import {CurrentUserActions} from "./currentUser.actions";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {mergeMap} from "rxjs";
import {User} from "../../shared/models/user.model";
import {CurrentUserSelectors} from "./currentUser.selectors";
import {map} from "rxjs/operators";


@Injectable()
export class CurrentUserEffects {
  constructor(private action$: Actions, private usersService: UsersService, private store: Store) {
    this.store.select(CurrentUserSelectors.user).subscribe(u => this.user = u)
  }

  user!: User;

  joinCourse$ = createEffect(() =>
    { return this.action$.pipe(
      ofType(CurrentUserActions.joinCourse),
      mergeMap((course) =>
        this.usersService.joinCourse(this.user, course).pipe(
          map(() => CurrentUserActions.joinCourseSuccess(course))
        )
      )
    ) }
  );
  leaveCourse$ = createEffect(() =>
    { return this.action$.pipe(
      ofType(CurrentUserActions.leaveCourse),
      mergeMap((course) =>
        this.usersService.leaveCourse(this.user, course).pipe(
          map(() => CurrentUserActions.leaveCourseSuccess(course))
        )
      )
    ) }
  );
  achieveCourse$ = createEffect(() =>
    { return this.action$.pipe(
      ofType(CurrentUserActions.achieveCourse),
      mergeMap((course) =>
        this.usersService.achieveCourse(this.user, course).pipe(
          map(() => CurrentUserActions.achieveCourseSuccess(course))
        )
      )
    ) }
  );
}
