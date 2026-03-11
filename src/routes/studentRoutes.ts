import express from "express";
import { StudentRepository } from "../repository/studentRepository";
import { StudentService } from "../services/studentService";
import { StudentController } from "../controllers/studentController";
import { ExternalApi } from "../api/externalApi";
import { adminAuth } from "../middleware/adminAuth";
const router=express.Router()

const repo=new StudentRepository()
const api=new ExternalApi()

const service=new StudentService(repo,api)
const controller=new  StudentController(service)

router.get("/login", (req, res) => {
     if ((req.session as any).isAdmin) {
       return res.redirect("/");
     }
  res.render("adminLogin", { error: null });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    (req.session as any).isAdmin = true;
    return res.redirect("/");
  }

  res.render("adminLogin", { error: "Invalid username or password" });
});

router.get("/", adminAuth,controller.getStudents.bind(controller));
router.post("/students", adminAuth,controller.createStudent.bind(controller));

router.get("/edit/:id",adminAuth, controller.editStudent.bind(controller));

router.post("/update/:id",adminAuth ,controller.updateStudent.bind(controller));

router.get("/delete/:id",adminAuth, controller.deleteStudent.bind(controller));

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

export default router