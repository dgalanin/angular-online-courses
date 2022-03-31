import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CurrentCoursesPageComponent } from './current-courses-page/current-courses-page.component';
import { AchievementsPageComponent } from './achievements-page/achievements-page.component';
import { CreateCoursePageComponent } from './create-course-page/create-course-page.component';
import {SharedModule} from "../shared/shared.module";
import {SystemRoutingModule} from "./system.routing-module";
import {SystemComponent} from "./system.component";



@NgModule({
  declarations: [
    SystemComponent,
    HeaderComponent,
    CoursesPageComponent,
    CurrentCoursesPageComponent,
    AchievementsPageComponent,
    CreateCoursePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
