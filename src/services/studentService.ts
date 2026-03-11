import { StudentRepository } from "../repository/studentRepository";
import { Student } from "../models/student";
import { StudentRequest } from "../models/studentRequest";
import { StudentResponse } from "../models/studentResponse";
import { ExternalApi } from "../api/externalApi";

export class StudentService {
  constructor(
    private repo: StudentRepository,
    private api: ExternalApi,
  ) {}

  async createStudent(req: StudentRequest): Promise<StudentResponse> {
    try {
      await this.api.fetchCourses(); //
      const student = new Student(
        Date.now(),
        req.name,
        Number(req.age),
        req.course,
      );
      this.repo.create(student);
      return { success: true, data: student };
    } catch (error) {
      return { success: false, message: "Error creating student" };
    }
  }
  async getStudents() {
    return await this.repo.getAll();
  }
  updateStudent(id: number, req: StudentRequest) {
    this.repo.update(id, req.name, Number(req.age), req.course);
  }
  deleteStudent(id: number) {
    this.repo.delete(id);
  }
  async getStudent(page: number, limit: number) {
    const allStudents = await this.repo.getAll();

    const start = (page - 1) * limit;
    const end = start + limit;

    const students = allStudents.slice(start, end);

    const totalPages = Math.ceil(allStudents.length / limit);

    return { students, totalPages };
  }
}
