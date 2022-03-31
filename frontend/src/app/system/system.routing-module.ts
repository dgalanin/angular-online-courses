import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SystemComponent} from "./system.component";
import {CoursesPageComponent} from "./courses-page/courses-page.component";
import {CurrentCoursesPageComponent} from "./current-courses-page/current-courses-page.component";
import {AchievementsPageComponent} from "./achievements-page/achievements-page.component";
import {CreateCoursePageComponent} from "./create-course-page/create-course-page.component";
import {AuthGuard} from "../shared/services/auth.guard";
import {TeacherGuard} from "../shared/services/teacher.guard";

const routes: Routes = [
  {path: "system", component: SystemComponent,  canActivate: [AuthGuard], children: [
      {path: "courses", component: CoursesPageComponent},
      {path: "current-courses", component: CurrentCoursesPageComponent},
      {path: "achievements", component: AchievementsPageComponent},
      {path: "create-course", canActivate: [TeacherGuard] ,component: CreateCoursePageComponent}
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
