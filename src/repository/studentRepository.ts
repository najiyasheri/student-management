import { Student } from "../models/student";

export class StudentRepository {
  private students: Student[] = [];

  create(student: Student) {
    this.students.push(student);
    console.log("Students:", this.students);
  }

  getAll() {
    return this.students;
  }

  update(id: number, name: string, age: number, course: string) {
    const student = this.students.find((s) => s.id === id);

    if (student) {
      student.name = name;
      student.age = age;
      student.course = course;
    }
  }
  delete(id: number) {
    this.students = this.students.filter((s) => s.id !== id);
  }
}