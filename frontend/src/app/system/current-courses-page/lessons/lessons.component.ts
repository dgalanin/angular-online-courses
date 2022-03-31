import {Component, Input} from '@angular/core';
import {Lesson} from "../../../shared/models/lesson.model";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent {

  constructor() {
  }

  @Input() lessons!: Array<Lesson>;
  showLessons = false;

}
