import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "../models/course.model";
import {Observable} from "rxjs";

interface CreateResponse {
  result: string
}

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {
  }

  getCourses(): Observable<Array<Course>> {
    return this.http
      .get<Array<Course>>(`api/courses`)
  }

  createCourse(course: Course) {
    return this.http
      .post<CreateResponse>(`api/courses`, course)
  }
}
