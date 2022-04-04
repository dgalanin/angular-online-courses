import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Observable, of} from "rxjs";
import {User} from "../../shared/models/user.model";
import {CurrentUserService} from "../../shared/services/currentUser.service";

import {Course} from "../../shared/models/course.model";
import {By} from "@angular/platform-browser";
import {CurrentCoursesPageComponent} from "./current-courses-page.component";

class mockCurrentUserService {
  mockUser = new User("mockEmail", "mockPass", "mockName", true, [new Course("mockTitle", "mockDesc", "mockAuthor", []), new Course("mockTitle2", "mockDesc", "mockAuthor", [])]);

  get(): Observable<User> {
    return of(this.mockUser);
  }

  joinToCourse(course: Course): Observable<User> {
    this.mockUser.currentCourses.push(course);
    return of(this.mockUser);
  }

  achieveCourse(course: Course): Observable<User> {
    this.mockUser.currentCourses.pop();
    return of(this.mockUser);
  }

  leaveFromCourse(course: Course): Observable<User> {
    this.mockUser.currentCourses.pop();
    return of(this.mockUser);
  }

}

describe('CurrentCoursesPageComponent', () => {
  let component: CurrentCoursesPageComponent;
  let fixture: ComponentFixture<CurrentCoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [CurrentCoursesPageComponent],
      providers: [
        {
          provide: CurrentUserService, useClass: mockCurrentUserService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get user currentCourses from currentUserService on initialization', () => {
    component.ngOnInit();
    expect(component.currentCourses.length).toEqual(2);
    expect(component.currentCourses[1].title).toEqual('mockTitle2');
  });

  it('should call leaveCourse method', () => {
    const onClickMock = spyOn(component, 'leaveCourse');
    fixture.debugElement.query(By.css('.btn-danger')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should call achieveCourse method', () => {
    const onClickMock = spyOn(component, 'achieveCourse');
    fixture.debugElement.query(By.css('.btn-success')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should add course to user achievements', () => {
    component.ngOnInit();
    component.achieveCourse(component.currentCourses[1]);
    expect(component.currentCourses.length).toEqual(1);
  });

  it('should leave course', () => {
    component.ngOnInit();
    component.leaveCourse(component.currentCourses[0]);
    expect(component.currentCourses.length).toEqual(1);
  });

});
