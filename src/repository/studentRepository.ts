import { connectDB } from "../db/db";
import { Student } from "../models/student";

export class StudentRepository {
  async create(student: Student) {
    const db = await connectDB();

    await db.collection("students").insertOne(student);
  }

  async getAll() {
    const db = await connectDB();

    return await db.collection("students").find().toArray();
  }

  async delete(id: number) {
    const db = await connectDB();

    await db.collection("students").deleteOne({ id: id });
  }

  async update(id: number, name: string, age: number, course: string) {
    const db = await connectDB();

    await db
      .collection("students")
      .updateOne({ id: id }, { $set: { name, age, course } });
  }
}
