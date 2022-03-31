import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../../shared/services/currentUser.service";
import {Course} from "../../shared/models/course.model";

@Component({
  selector: 'app-achievements-page',
  templateUrl: './achievements-page.component.html',
  styleUrls: ['./achievements-page.component.scss']
})
export class AchievementsPageComponent implements OnInit {
  constructor(private currentUserService: CurrentUserService) {
  }

  achievements!: Array<Course>;

  ngOnInit() {
    this.currentUserService.get().subscribe(user => this.achievements = user.achievements);
  }

}
