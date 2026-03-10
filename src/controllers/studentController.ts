import { Request,Response } from "express";
import { StudentService } from "../services/studentService";

export class StudentController {
  constructor(private service: StudentService) {}

  async createStudent(req: Request, res: Response) {
    const { name, age, course } = req.body;

    if (!name || !age || !course) {
      return res.send("All fields are required");
    }

    if (name.length < 3) {
      return res.send("Name must be at least 3 characters");
    }

    if (Number(age) <= 0) {
      return res.send("Age must be greater than 0");
    }

    await this.service.createStudent(req.body);

    res.redirect("/");
  }
  getStudents(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = 3;

    const result = this.service.getStudent(page, limit);

    res.render("index", {
      students: result.students,
      page,
      totalPages: result.totalPages,
    });
  }
  editStudent(req: Request, res: Response) {
    const students = this.service.getStudents();

    const student = students.find((s) => s.id == Number(req.params.id));

    res.render("edit", { student });
  }

  updateStudent(req: Request, res: Response) {
    const { name, age, course } = req.body;

    if (!name || !age || !course) {
      return res.send("All fields are required");
    }

    this.service.updateStudent(Number(req.params.id), req.body);

    res.redirect("/");
  }
  deleteStudent(req: Request, res: Response) {
    this.service.deleteStudent(Number(req.params.id));

    res.redirect("/");
  }
}
