import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../models/user.model";
import {Course} from "../models/course.model";
import {environment} from "../../../environments/environment";


@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {
  }

  readonly apiUrl = environment.apiURL;

  getUserByEmail(email: string): Observable<User> {
    return this.http
      .get<Array<User>>(`${this.apiUrl}/api/users`)
      .pipe(
        map((users: Array<User>) => users.filter((user: User) => user.email === email)),
        map((array: Array<User>) => array[0])
      )
  }

  createNewUser(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/api/users`, user)
  }

  getCurrentCourses(user: User): Observable<Array<Course>> {
    return this.http
      .get<User>(`${this.apiUrl}/api/users/${user._id}`)
      .pipe(map((user: User) => {
        return user.currentCourses;
      }))
  }

  joinCourse(user: User, course: Course): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/api/users/${user._id}`, {currentCourses: [...user.currentCourses, course]})
  }


  leaveCourse(user: User, course: Course): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/api/users/${user._id}`, {
        currentCourses: [...user.currentCourses.filter(
          c => c.title !== course.title && c.description !== course.description && c.authorName !== course.authorName
        )]
      })
  }

  achieveCourse(user: User, course: Course): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/api/users/${user._id}`, {
        currentCourses: [...user.currentCourses.filter(
          c => c.title !== course.title && c.description !== course.description && c.authorName !== course.authorName
        )],
        achievements: [...user.achievements, course]
      })
  }
}
