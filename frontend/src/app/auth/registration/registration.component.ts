import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from 'src/app/shared/models/user.model';
import {UsersService} from "../../shared/services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email],
        // @ts-ignore
        this.forbiddenEmails.bind(this)),
      'name': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password2': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue]),
      'isTeacher': new FormControl(false)
    });
  }

  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
      this.password.setErrors(null);
    } else {
      this.confirm_password.setErrors({mismatch: true});
      this.password.setErrors({mismatch: true});
    }
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }

  get confirm_password(): AbstractControl {
    return this.form.controls['password2'];
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        })
    })
  }

  onSubmit() {
    console.log(this.form)
    const {email, password, name, isTeacher} = this.form.value;
    const user = new User(email, password, name, isTeacher);
    this.usersService.createNewUser(user).subscribe(res => {
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      })
    })
  }

}
