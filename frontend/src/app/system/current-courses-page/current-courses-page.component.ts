import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../shared/services/currentUser.service";
import {User} from "../../shared/models/user.model";
import {Course} from "../../shared/models/course.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-current-courses-page',
  templateUrl: './current-courses-page.component.html',
  styleUrls: ['./current-courses-page.component.scss']
})
export class CurrentCoursesPageComponent  implements OnInit{
  constructor(private currentUserService: CurrentUserService) {
  }

  showLessons: boolean = false;
  user: Observable<User> = this.currentUserService.get();
  currentCourses!: Array<Course>;

  ngOnInit(): void {
    this.user.subscribe(user => this.currentCourses = user.currentCourses);
  }

  achieveCourse(course: Course) {
    this.currentUserService.achieveCourse(course);
  }

  leaveCourse(course: Course) {
    this.currentUserService.leaveFromCourse(course);
  }

}
