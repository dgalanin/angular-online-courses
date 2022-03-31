import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {Course} from "../../shared/models/course.model";
import {CurrentUserService} from "../../shared/services/currentUser.service";
import {CoursesService} from "../../shared/services/courses.service";

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  courses!: Array<Course>
  user!: User;

  constructor(private coursesService: CoursesService,
              private currentUserService: CurrentUserService) {
  }

  ngOnInit(): void {
    this.currentUserService.get().subscribe(u => this.user = u);
    this.coursesService.getCourses().subscribe(c => this.courses = c);
  }

  joinCourse(course: Course) {
    if (this.user.currentCourses.find(el => el.title == course.title)) {
      alert("You have already joined to this course!");
    } else if (this.user.achievements.find(el => el.title == course.title)) {
      alert("You are already achieved to this course!");
    } else {
      this.currentUserService.joinToCourse(course);
      alert("You have been joined to the course!")
    }
  }

}
