import {Course} from "./course.model";

export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public isTeacher: boolean,
    public currentCourses: Array<Course> = [],
    public achievements: Array<Course> =  [],
    public _id?: string
  ) {
  }
}
