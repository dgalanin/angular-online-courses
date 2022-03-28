import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsersService} from "../../shared/services/users.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  showError = false;
  showCanLogin = false;
  showNeedLogin = false;
  passHide = true;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showCanLogin = true;
        }
        if (params['needLogin']) {
          this.showNeedLogin = true;
        }
      })
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user) => {
        if (user) {
          if (user.password === formData.password) {
            // TODO authorization
            console.log("Signed in!");
            this.showError = false;
          } else {
            this.showError = true;
          }
        } else {
          this.showError = true;
        }
      });
  }
}
