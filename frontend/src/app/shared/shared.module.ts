import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "./services/users.service";
import {CoursesService} from "./services/courses.service";

@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule],
  providers: [UsersService, CoursesService]
})
export class SharedModule {

}
