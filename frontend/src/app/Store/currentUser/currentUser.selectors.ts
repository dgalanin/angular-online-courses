import {createFeatureSelector, createSelector} from "@ngrx/store";
import {User} from "../../shared/models/user.model";


export namespace CurrentUserSelectors {
  export const state = createFeatureSelector<User>("currentUser");

  export const user = createSelector(state, (state) => state);
  export const courses = createSelector(state, (state) => state.currentCourses);
  export const achievements = createSelector(state, (state) => state.achievements);
}
