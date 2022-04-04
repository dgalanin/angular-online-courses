import {TestBed} from "@angular/core/testing";
import {CoursesService} from "./courses.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Course} from "../models/course.model";
import {Lesson} from "../models/lesson.model";
import {environment} from "../../../environments/environment";

describe('CoursesService', () => {
  let httpTestingController: HttpTestingController;
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return courses', () => {
    const mockCourse1 = new Course("mockTitle1", "mockDesc", "mockAuthor", [new Lesson("mockTopic", "lorem")]);
    const mockCourse2 = new Course("mockTitle2", "mockDesc", "mockAuthor", [new Lesson("mockTopic", "lorem")]);
    const mockCourse3 = new Course("mockTitle3", "mockDesc", "mockAuthor", [new Lesson("mockTopic", "lorem")]);
    const mockCourses = [mockCourse1, mockCourse2, mockCourse3];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toEqual(3);
      expect(courses[0].title).toEqual('mockTitle1');
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/courses`);
    expect(req.request.method).toEqual("GET");
    req.flush(mockCourses);

  });

  it('should add new course', () => {
    const mockCourse = new Course("mockTitle", "mockDesc", "mockAuthor", [new Lesson("mockTopic", "lorem")]);

    service.createCourse(mockCourse).subscribe(course => {
      expect(course.title).toEqual('mockTitle');
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/api/courses`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockCourse);
  });
});
