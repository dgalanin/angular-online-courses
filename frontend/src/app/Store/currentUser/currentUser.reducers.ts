import {createReducer, on} from "@ngrx/store";

import {User} from "../../shared/models/user.model";
import {CurrentUserActions} from "./currentUser.actions";

const initialState: User = new User("", "", "", false);


export const currentUserReducer = createReducer(
  initialState,
  on(CurrentUserActions.get, (state) => state),
  on(CurrentUserActions.set, (state, user) => user),
  on(CurrentUserActions.joinCourseSuccess, (state, course) => ({
    ...state,
    currentCourses: [...state.currentCourses, course]
  })),
  on(CurrentUserActions.leaveCourseSuccess, (state, course) => ({
    ...state,
    currentCourses: [...state.currentCourses.filter(
      c => c.title !== course.title && c.description !== course.description && c.authorName !== course.authorName
    )]
  })),
  on(CurrentUserActions.achieveCourseSuccess, (state, course) => ({
    ...state,
    currentCourses: [...state.currentCourses.filter(
      c => c.title !== course.title && c.description !== course.description && c.authorName !== course.authorName
    )],
    achievements: [...state.achievements, course]
  }))
)
