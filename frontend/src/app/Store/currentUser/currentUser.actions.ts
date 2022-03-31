import {createAction} from "@ngrx/store";
import {User} from "../../shared/models/user.model";
import {Course} from "../../shared/models/course.model";

export namespace CurrentUserActions {
  export const get = createAction(
    '[Current user] Get'
  );
  export const set = createAction(
    '[Current user] Set',
    (user: User) => user
  );
  export const reSet = createAction(
    '[Current user] reSet'
  );
  export const joinCourse = createAction(
    '[Current user] Join course',
    (course: Course) => course
  );
  export const joinCourseSuccess = createAction(
    '[Current user] Join course success',
    (course: Course) => course
  );
  export const leaveCourse = createAction(
    '[Current user] Leave course',
    (course: Course) => course
  );
  export const leaveCourseSuccess = createAction(
    '[Current user] Leave course success',
    (course: Course) => course
  );
  export const achieveCourse = createAction(
    '[Current user] AchieveCourse',
    (course: Course) => course
  );
  export const achieveCourseSuccess = createAction(
    '[Current user] AchieveCourse success',
    (course: Course) => course
  );

}

