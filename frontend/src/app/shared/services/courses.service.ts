import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "../models/course.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {
  }

  readonly apiUrl = environment.apiURL;

  getCourses(): Observable<Array<Course>> {
    return this.http
      .get<Array<Course>>(`${this.apiUrl}/api/courses`)
  }

  createCourse(course: Course): Observable<Course> {
    return this.http
      .post<Course>(`${this.apiUrl}/api/courses`, course)
  }
}
