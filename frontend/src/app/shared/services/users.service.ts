import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../models/user.model";
import {Course} from "../models/course.model";

interface CreateResponse {
  result: string
}

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get<Array<User>>(`http://localhost:3000/api/users`)
      .pipe(
        map((users: Array<User>) => users.filter((user: User) => user.email === email)),
        map((array: Array<User>) => array[0])
      )
  }

  createNewUser(user: User) {
    return this.http
      .post<CreateResponse>(`http://localhost:3000/api/users`, user)
  }

  getCurrentCourses(user: User): Observable<Array<Course>> {
    return this.http
      .get<User>(`http://localhost:3000/api/users/${user.id}`)
      .pipe(map((user: User) => {
        return user.currentCourses;
      }))
  }

  joinCourse(user: User, course: Course) {
    user.currentCourses.push(course);

    return this.http
      .put(`http://localhost:3000/api/users/${user.id}`, user)
  }

  leaveCourse(user: User, course: Course) {
    user.currentCourses = user.currentCourses.filter(c => c.title != course.title);

    return this.http
      .put<User>(`http://localhost:3000/api/users/${user.id}`, user)
  }

  achieveCourse(user: User, course: Course) {
    user.currentCourses = user.currentCourses.filter(c => c.title != course.title);
    user.achievements.push(course);

    return this.http
      .put<User>(`http://localhost:3000/api/users/${user.id}`, user)
  }
}
