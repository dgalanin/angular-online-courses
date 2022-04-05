import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {CreateCoursePageComponent} from "./create-course-page.component";
import {CurrentUserService} from "../../shared/services/currentUser.service";
import {CoursesService} from "../../shared/services/courses.service";
import {Observable, of} from "rxjs";
import {Course} from "../../shared/models/course.model";
import {User} from "../../shared/models/user.model";

class mockCurrentUserService {
  mockUser = new User("mockEmail", "mockPass", "mockName", true, [new Course("mockTitle", "mockDesc", "mockAuthor", []), new Course("mockTitle2", "mockDesc", "mockAuthor", [])]);

  get(): Observable<User> {
    return of(this.mockUser);
  }
}

class mockCoursesService {
  getCourses(): Observable<Array<Course>> {
    const mockCourse = new Course("mockTitle", "mockDesc", "mockAuthor", []);
    const mockCourse2 = new Course("mockTitle2", "mockDesc", "mockAuthor", []);
    const mockCourse3 = new Course("mockTitle3", "mockDesc", "mockAuthor", []);
    const mockCourses: Array<Course> = [mockCourse, mockCourse2, mockCourse3];
    return of(mockCourses);
  }
}


describe('CreateCoursePageComponent', () => {
  let component: CreateCoursePageComponent;
  let fixture: ComponentFixture<CreateCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCoursePageComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: CurrentUserService, useClass: mockCurrentUserService
        },
        {
          provide: CoursesService, useClass: mockCoursesService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain open add lesson form on button click', () => {
    fixture.debugElement.query(By.css('.btn')).triggerEventHandler('click', null);
    expect(component.showAddLessonForm).toBeTruthy();
  });

  it('should contain 2 inputs and 2 text areas after click button', () => {
    fixture.debugElement.query(By.css('.btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    const inputElems = fixture.debugElement.nativeElement.querySelectorAll('input');
    const textAreaElems = fixture.debugElement.nativeElement.querySelectorAll('input');
    expect(inputElems.length).toEqual(2);
    expect(textAreaElems.length).toEqual(2);
  });

  it('should validate lesson fields before entering some values', () => {
    fixture.debugElement.query(By.css('.btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    const topicLessonFormControl = component.lessonForm.get('topic');
    const lessonControl = component.lessonForm.get('lesson');
    expect(topicLessonFormControl!.errors!['required']).toBeTruthy();
    expect(lessonControl!.errors!['required']).toBeTruthy();
  });

  it('should validate lesson fields after entering some values', () => {
    fixture.debugElement.query(By.css('.btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    const topicElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[1];
    const lessonElem: HTMLTextAreaElement = fixture.debugElement.nativeElement.querySelectorAll('textarea')[1];


    topicElem.value = "New Lesson";
    topicElem.dispatchEvent(new Event('input'));
    lessonElem.value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam est exercitationem illum officiis voluptatum. Deserunt doloribus eius natus veniam veritatis?";
    lessonElem.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const topicControl = component.lessonForm.get('topic');
    const lessonControl = component.lessonForm.get('lesson');
    expect(topicElem.value).toEqual(topicControl?.value);
    expect(topicControl?.errors).toBeNull();
    expect(lessonElem.value).toEqual(lessonControl?.value);
    expect(lessonControl?.errors).toBeNull();
  });

  it('should validate course fields before entering some values', () => {
    const titleControl = component.courseForm.get('title');
    const descControl = component.courseForm.get('description');
    expect(titleControl!.errors!['required']).toBeTruthy();
    expect(descControl!.errors!['required']).toBeTruthy();
  });

  it('should validate course fields after entering some values', () => {
    const titleElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[0];
    const descElem: HTMLTextAreaElement = fixture.debugElement.nativeElement.querySelectorAll('textarea')[0];

    titleElem.value = "New Course";
    titleElem.dispatchEvent(new Event('input'));
    descElem.value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam est exercitationem illum officiis voluptatum. Deserunt doloribus eius natus veniam veritatis?";
    descElem.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const titleControl = component.courseForm.get('title');
    const descControl = component.courseForm.get('description');
    expect(titleElem.value).toEqual(titleControl?.value);
    expect(titleControl?.errors).toBeNull();
    expect(descElem.value).toEqual(descControl?.value);
    expect(descControl?.errors).toBeNull();
  });

  it('should validate form after entering valid values', () => {
    fixture.debugElement.query(By.css('.btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    const titleElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[0];
    const descElem: HTMLTextAreaElement = fixture.debugElement.nativeElement.querySelectorAll('textarea')[0];
    const topicElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[1];
    const lessonElem: HTMLTextAreaElement = fixture.debugElement.nativeElement.querySelectorAll('textarea')[1];

    titleElem.value = "New Course";
    titleElem.dispatchEvent(new Event('input'));
    descElem.value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam est exercitationem illum officiis voluptatum. Deserunt doloribus eius natus veniam veritatis?";
    descElem.dispatchEvent(new Event('input'));
    topicElem.value = "New Lesson";
    topicElem.dispatchEvent(new Event('input'));
    lessonElem.value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam est exercitationem illum officiis voluptatum. Deserunt doloribus eius natus veniam veritatis?";
    lessonElem.dispatchEvent(new Event('input'));

    const isFormValid = component.courseForm.valid;
    expect(isFormValid).toBeTruthy();

  });

  it('should call login method on submit form', () => {
    const onClickMock = spyOn(component, 'onCourseFormSubmit');
    fixture.debugElement.query(By.css('.form-inline')).triggerEventHandler('submit', null);
    expect(onClickMock).toHaveBeenCalled();
  });
});
