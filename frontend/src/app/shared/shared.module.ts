import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "./services/users.service";
import {CoursesService} from "./services/courses.service";
import {AuthService} from "./services/auth.service";
import {CurrentUserService} from "./services/currentUser.service";
import {AuthGuard} from "./services/auth.guard";
import {TeacherGuard} from "./services/teacher.guard";

@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule],
  providers: [UsersService, CoursesService, AuthService, CurrentUserService, AuthGuard, TeacherGuard]
})
export class SharedModule {

}
