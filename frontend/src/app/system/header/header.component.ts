import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {CurrentUserService} from "../../shared/services/currentUser.service";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user!: User;

  constructor(private authService: AuthService,
              private currentUserService: CurrentUserService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.currentUserService.get();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
