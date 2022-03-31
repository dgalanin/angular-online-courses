import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "./services/users.service";
import {CoursesService} from "./services/courses.service";
import {AuthService} from "./services/auth.service";
import {currentUserService} from "./services/currentUser.service";

@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule],
  providers: [UsersService, CoursesService, AuthService, currentUserService]
})
export class SharedModule {

}
