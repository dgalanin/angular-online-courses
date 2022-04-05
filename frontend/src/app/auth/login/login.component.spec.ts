import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";
import {UsersService} from "../../shared/services/users.service";
import {AuthService} from "../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {By} from "@angular/platform-browser";

class mockUsersService {

}

class mockRouter {

}

class mockAuthService {

}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: UsersService, useClass: mockUsersService
        },
        {
          provide: AuthService, useClass: mockAuthService
        },
        {
          provide: Router, useClass: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of('')
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 2 inputs', () => {
    const formElem = fixture.debugElement.nativeElement.querySelector('.form');
    const inputElems = formElem.querySelectorAll('input');
    expect(inputElems.length).toEqual(2);
  });

  it('should set placeholder', () => {
    const formElem = fixture.debugElement.nativeElement.querySelector('.form');
    const inputElem = formElem.querySelector('input');
    expect(inputElem.placeholder).toEqual('pat@example.com');
  });

  it('should validate email and password before entering some values', () => {
    const emailFormControl = component.form.get('email');
    const passwordFormControl = component.form.get('password');
    expect(emailFormControl!.errors!['required']).toBeTruthy();
    expect(passwordFormControl!.errors!['required']).toBeTruthy();
  });

  it('should validate email and password after entering some values', () => {
    const emailElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[0];
    const passwordElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[1];

    emailElem.value = "google@gmail.com";
    emailElem.dispatchEvent(new Event('input'));
    passwordElem.value = "google123";
    passwordElem.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailControl = component.form.get('email');
      const passwordControl = component.form.get('password');
      expect(emailElem.value).toEqual(emailControl?.value);
      expect(passwordElem.value).toEqual(passwordControl?.value);
      expect(emailControl?.errors).toBeNull();
      expect(passwordControl?.errors).toBeNull();
    });
  });

  it('should validate form after entering valid values', () => {
    const emailElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[0];
    const passwordElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[1];

    emailElem.value = "google@gmail.com";
    emailElem.dispatchEvent(new Event('input'));
    passwordElem.value = "google123";
    passwordElem.dispatchEvent(new Event('input'));

    const isFormValid = component.form.valid;
    fixture.whenStable().then(() => {
      expect(isFormValid).toBeTruthy();
    });
  });

  it('should call login method on submit form', () => {
    const onClickMock = spyOn(component, 'onSubmit');
    fixture.debugElement.query(By.css('.form')).triggerEventHandler('submit', null);
    expect(onClickMock).toHaveBeenCalled();
  });
});
