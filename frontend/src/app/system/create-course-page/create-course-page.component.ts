import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CoursesService} from "../../shared/services/courses.service";
import {User} from "../../shared/models/user.model";
import {Lesson} from "../../shared/models/lesson.model";
import {CurrentUserService} from "../../shared/services/currentUser.service";
import {Course} from "../../shared/models/course.model";

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {
  constructor(private coursesService: CoursesService,
              private currentUserService: CurrentUserService) {
  }

  courseForm!: FormGroup;
  private initialCourseFormValues: any;
  lessonForm!: FormGroup;
  private initialLessonFormValues: any;
  user!: User;
  showAddLessonForm: boolean = false;
  lessons: Array<Lesson> = new Array<Lesson>();

  showIfSuccess = false;


  ngOnInit(): void {
    this.currentUserService.get().subscribe(user => this.user = user)
    this.courseForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)
    });
    this.lessonForm = new FormGroup({
      'topic': new FormControl('', Validators.required),
      'lesson': new FormControl('', [Validators.required, Validators.minLength(100)],)
    })
    this.initialCourseFormValues = this.courseForm.value;
    this.initialLessonFormValues = this.lessonForm.value;
  }

  onCourseFormSubmit() {
    const {title, description} = this.courseForm.value;
    const course = new Course(title, description, this.user.name, this.lessons);
    this.coursesService.createCourse(course).subscribe(() => {
      this.courseForm.reset(this.initialCourseFormValues);
      this.lessons = new Array<Lesson>();
    });

    this.showIfSuccess = true;
    setTimeout(() => {
      this.showIfSuccess = false;
    }, 2000)
  }


  onLessonFormSubmit() {
    const {topic, lesson} = this.lessonForm.value;
    const newLesson = new Lesson(topic, lesson);

    this.showAddLessonForm = false;
    this.lessons.push(newLesson);
    this.lessonForm.reset(this.initialLessonFormValues);
  }
}
