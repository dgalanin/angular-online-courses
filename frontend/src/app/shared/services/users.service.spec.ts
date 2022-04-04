import {TestBed} from "@angular/core/testing";
import {UsersService} from "./users.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {User} from "../models/user.model";
import {Course} from "../models/course.model";
import {Lesson} from "../models/lesson.model";

describe('UsersService', () => {
  let httpTestingController: HttpTestingController;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(UsersService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by email', () => {
    const mockUser1 = new User("1@gmail.com", "mock", "mock1", false);
    const mockUser2 = new User("2@gmail.com", "mock", "mock2", false);
    const mockUser3 = new User("3@gmail.com", "mock", "mock3", false);
    const mockUsers: Array<User> = [mockUser1, mockUser2, mockUser3];

    service.getUserByEmail("2@gmail.com").subscribe(user => {
      expect(user.email).toEqual("2@gmail.com");
      expect(user.name).toEqual('mock2');
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/users`);
    expect(req.request.method).toEqual("GET");
    req.flush(mockUsers);
  });

  it('should create new user', () => {
    const mockUser1 = new User("1@gmail.com", "mock", "mock1", false);

    service.createNewUser(mockUser1).subscribe(user => {
      expect(user.email).toEqual(mockUser1.email);
      expect(user.name).toEqual(mockUser1.name);
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/users`);
    expect(req.request.method).toEqual("POST");
    req.flush(mockUser1);
  });

  it('should get current courses', () => {
    const mockCourse = new Course("mockCourse", "mockDesc", "mockAuthor", [new Lesson("mockTopic", "mock lesson....")]);
    const mockUser1 = new User("1@gmail.com", "mock", "mock1", false, [mockCourse]);

    service.getCurrentCourses(mockUser1).subscribe(courses => {
      expect(courses.length).toEqual(1);
      expect(courses[0].title).toEqual('mockCourse');
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/users/${mockUser1._id}`);
    expect(req.request.method).toEqual("GET");
    req.flush(mockUser1);
  });

  it('should join course', () => {
    const mockCourse = new Course("mockCourse", "mockDesc", "mockAuthor", [new Lesson("mockTopic", "mock lesson....")]);
    const mockUser1 = new User("1@gmail.com", "mock", "mock1", false, []);

    service.joinCourse(mockUser1, mockCourse).subscribe(user => {
      expect(user.currentCourses.length).toEqual(1);
      expect(user.currentCourses[0].title).toEqual('mockCourse');
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/users/${mockUser1._id}`);
    expect(req.request.method).toEqual("PUT");
    req.flush([mockUser1, mockCourse]);
  });

  it('should get current courses', () => {
    const mockCourse = new Course("mockCourse", "mockDesc", "mockAuthor", [new Lesson("mockTopic", "mock lesson....")]);
    const mockUser1 = new User("1@gmail.com", "mock", "mock1", false, []);

    service.leaveCourse(mockUser1, mockCourse).subscribe(user => {
      expect(user.currentCourses.length).toEqual(0);
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/users/${mockUser1._id}`);
    expect(req.request.method).toEqual("PUT");
    req.flush([mockUser1, mockCourse]);
  });

  it('should achieve course', () => {
    const mockCourse = new Course("mockCourse", "mockDesc", "mockAuthor", [new Lesson("mockTopic", "mock lesson....")]);
    const mockUser1 = new User("1@gmail.com", "mock", "mock1", false, [mockCourse]);

    service.achieveCourse(mockUser1, mockCourse).subscribe(user => {
      expect(user.achievements.length).toEqual(1);
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/users/${mockUser1._id}`);
    expect(req.request.method).toEqual("PUT");
    req.flush([mockUser1, mockCourse]);
  });
});
