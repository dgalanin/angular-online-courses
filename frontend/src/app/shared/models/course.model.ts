import {Lesson} from "./lesson.model";

export class Course {
  constructor(
    public title: string,
    public description: string,
    public authorName: string,
    public lessons: Array<Lesson>,
    public _id?: string
  ) {
  }
}
