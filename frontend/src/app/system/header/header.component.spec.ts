import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {Observable, of} from "rxjs";
import {User} from "../../shared/models/user.model";
import {CurrentUserService} from "../../shared/services/currentUser.service";

import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

class mockCurrentUserService {
  get(): Observable<User> {
    const mockUser = new User("mockEmail", "mockPass", "mockName", true);
    return of(mockUser);
  }
}

class mockRouter {

}

class mockAuthService {

}


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: CurrentUserService, useClass: mockCurrentUserService
        },
        {
          provide: AuthService, useClass: mockAuthService
        },
        {
          provide: Router, useClass: mockRouter
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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

  it('should display user name in greetings div', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const greetings_span = fixture.nativeElement.querySelector('.greetings');
    expect(greetings_span.text).toEqual('Hello, mockName');
  });
});
