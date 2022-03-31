import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCoursesPageComponent } from './current-courses-page.component';

describe('CurrentCoursesPageComponent', () => {
  let component: CurrentCoursesPageComponent;
  let fixture: ComponentFixture<CurrentCoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCoursesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
