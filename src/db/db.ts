import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

export async function connectDB() {
  await client.connect();
  return client.db("student_management");
}
