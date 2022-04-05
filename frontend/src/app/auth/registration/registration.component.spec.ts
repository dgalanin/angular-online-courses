import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {Router} from "@angular/router";
import {By} from "@angular/platform-browser";
import {RegistrationComponent} from "./registration.component";

class mockUsersService {

}

class mockRouter {

}


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: UsersService, useClass: mockUsersService
        },
        {
          provide: Router, useClass: mockRouter
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 6 inputs', () => {
    const formElem = fixture.debugElement.nativeElement.querySelector('.form');
    const inputElems = formElem.querySelectorAll('input');
    expect(inputElems.length).toEqual(6);
  });

  it('should set placeholders', () => {
    const emailElem = fixture.debugElement.nativeElement.querySelector('.form').querySelectorAll('input')[0];
    const nameElem = fixture.debugElement.nativeElement.querySelectorAll('input')[1];
    expect(emailElem.placeholder).toEqual('pat@example.com');
    expect(nameElem.placeholder).toEqual('Galanin Dmitry');
  });

  it('should validate fields before entering some values', () => {
    const emailFormControl = component.form.get('email');
    const nameFormControl = component.form.get('name');
    const passwordFormControl = component.form.get('password');
    const password2FormControl = component.form.get('password2');
    const agreeFormControl = component.form.get('agree');
    expect(emailFormControl!.errors!['required']).toBeTruthy();
    expect(nameFormControl!.errors!['required']).toBeTruthy();
    expect(passwordFormControl!.errors!['required']).toBeTruthy();
    expect(password2FormControl!.errors!['required']).toBeTruthy();
    expect(agreeFormControl!.errors!['required']).toBeTruthy();
  });

  it('should validate fields after entering some values', () => {
    const emailElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[0];
    const nameElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[1];
    const passwordElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[2];
    const password2Elem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[3];
    const agreeElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[5];

    emailElem.value = "google@gmail.com";
    emailElem.dispatchEvent(new Event('input'));
    nameElem.value = "Dmitry Test";
    nameElem.dispatchEvent(new Event('input'));
    passwordElem.value = "google123";
    passwordElem.dispatchEvent(new Event('input'));
    password2Elem.value = "google123";
    password2Elem.dispatchEvent(new Event('input'));
    agreeElem.checked = true;
    emailElem.dispatchEvent(new Event('checked'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const emailControl = component.form.get('email');
      const nameControl = component.form.get('name');
      const passwordControl = component.form.get('password');
      const password2Control = component.form.get('password2');
      const agreeControl = component.form.get('agree');
      expect(emailElem.value).toEqual(emailControl?.value);
      expect(emailControl?.errors).toBeNull();
      expect(nameElem.value).toEqual(nameControl?.value);
      expect(nameControl?.errors).toBeNull();
      expect(passwordElem.value).toEqual(passwordControl?.value);
      expect(passwordControl?.errors).toBeNull();
      expect(password2Elem.value).toEqual(password2Control?.value);
      expect(password2Control?.errors).toBeNull();
      expect(agreeElem.value).toEqual(agreeControl?.value);
      expect(agreeControl?.errors).toBeNull();
    });
  });

  it('should validate form after entering valid values', () => {
    const emailElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[0];
    const nameElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[1];
    const passwordElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[2];
    const password2Elem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[3];
    const agreeElem: HTMLInputElement = fixture.debugElement.nativeElement.querySelectorAll('input')[5];

    emailElem.value = "google@gmail.com";
    emailElem.dispatchEvent(new Event('input'));
    nameElem.value = "Dmitry Test";
    nameElem.dispatchEvent(new Event('input'));
    passwordElem.value = "google123";
    passwordElem.dispatchEvent(new Event('input'));
    password2Elem.value = "google123";
    password2Elem.dispatchEvent(new Event('input'));
    agreeElem.checked = true;
    emailElem.dispatchEvent(new Event('checked'));

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
