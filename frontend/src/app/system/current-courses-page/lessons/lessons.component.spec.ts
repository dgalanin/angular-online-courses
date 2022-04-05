import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LessonsComponent} from "./lessons.component";
import {Lesson} from "../../../shared/models/lesson.model";
import {By} from "@angular/platform-browser";


describe('LessonsComponent', () => {
  let component: LessonsComponent;
  let fixture: ComponentFixture<LessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonsComponent);
    component = fixture.componentInstance;
    component.lessons = [new Lesson("lesson1", "lesson")]
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should showLessons on click', () => {
    fixture.debugElement.query(By.css('.btn-outline-dark')).triggerEventHandler('click', null);
    expect(component.showLessons).toEqual(true);
  });

  it('should close showLessons on double-click', () => {
    fixture.debugElement.query(By.css('.btn-outline-dark')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('.btn-outline-dark')).triggerEventHandler('click', null);
    expect(component.showLessons).toEqual(false);
  });

  it('should close showLessons on close-btn', () => {
    fixture.debugElement.query(By.css('.btn-outline-dark')).triggerEventHandler('click', null);
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.btn-close')).triggerEventHandler('click', null);
    expect(component.showLessons).toEqual(false);
  });
});
