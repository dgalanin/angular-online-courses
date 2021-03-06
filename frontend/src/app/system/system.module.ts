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
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import { LessonsComponent } from './current-courses-page/lessons/lessons.component';



@NgModule({
  declarations: [
    SystemComponent,
    HeaderComponent,
    CoursesPageComponent,
    CurrentCoursesPageComponent,
    AchievementsPageComponent,
    CreateCoursePageComponent,
    LessonsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule
  ]
})
export class SystemModule { }
