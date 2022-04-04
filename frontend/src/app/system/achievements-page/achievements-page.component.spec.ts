import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Observable, of} from "rxjs";
import {User} from "../../shared/models/user.model";
import {CurrentUserService} from "../../shared/services/currentUser.service";

import {Course} from "../../shared/models/course.model";
import {AchievementsPageComponent} from "./achievements-page.component";

class mockCurrentUserService {
  mockUser = new User("mockEmail", "mockPass", "mockName", true, [], [new Course("mockTitle", "mockDesc", "mockAuthor", []), new Course("mockTitle2", "mockDesc", "mockAuthor", [])]);

  get(): Observable<User> {
    return of(this.mockUser);
  }
}

describe('AchievementsPageComponent', () => {
  let component: AchievementsPageComponent;
  let fixture: ComponentFixture<AchievementsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [AchievementsPageComponent],
      providers: [
        {
          provide: CurrentUserService, useClass: mockCurrentUserService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get user achievements', () => {
    component.ngOnInit();
    expect(component.achievements.length).toEqual(2);
    expect(component.achievements[0].title).toEqual('mockTitle');
    expect(component.achievements[1].title).toEqual('mockTitle2');
  });
});
