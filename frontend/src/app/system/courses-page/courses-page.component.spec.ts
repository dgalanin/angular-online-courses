import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Observable, of} from "rxjs";
import {User} from "../../shared/models/user.model";
import {CurrentUserService} from "../../shared/services/currentUser.service";

import {CoursesPageComponent} from "./courses-page.component";
import {CoursesService} from "../../shared/services/courses.service";
import {Course} from "../../shared/models/course.model";
import {By} from "@angular/platform-browser";

class mockCurrentUserService {
  mockUser = new User("mockEmail", "mockPass", "mockName", true);
  get(): Observable<User> {
    return of(this.mockUser);
  }
  joinToCourse(course: Course): Observable<User> {
    this.mockUser.currentCourses.push(course);
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


describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [CoursesPageComponent],
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
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get user from currentUserService on initialization', () => {
    component.ngOnInit();
    const mockUser = new User("mockEmail", "mockPass", "mockName", true);
    expect(component.user).toEqual(mockUser);
  });

  it('should get courses from coursesService on initialization', () => {
    component.ngOnInit();
    expect(component.courses.length).toEqual(3);
    expect(component.courses[1].title).toEqual('mockTitle2');
  });

  it('should call onClick method joinCourse', () => {
    const onClickMock = spyOn(component, 'joinCourse');
    fixture.debugElement.query(By.css('.btn')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should add course to user current courses', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.joinCourse(component.courses[2]);
    expect(component.user.currentCourses.length).toEqual(1);
    expect(component.user.currentCourses[0].title).toEqual('mockTitle3');
  });
});
