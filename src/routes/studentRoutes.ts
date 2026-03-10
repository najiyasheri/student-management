import express from "express";
import { StudentRepository } from "../repository/studentRepository";
import { StudentService } from "../services/studentService";
import { StudentController } from "../controllers/studentController";
import { ExternalApi } from "../api/externalApi";

const router=express.Router()

const repo=new StudentRepository()
const api=new ExternalApi()

const service=new StudentService(repo,api)
const controller=new  StudentController(service)

router.get('/',controller.getStudents.bind(controller))
router.post('/students',controller.createStudent.bind(controller))

router.get("/edit/:id", controller.editStudent.bind(controller));

router.post("/update/:id", controller.updateStudent.bind(controller));

router.get("/delete/:id", controller.deleteStudent.bind(controller));

export default router