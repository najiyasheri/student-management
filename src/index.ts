import express from "express";
import path from "path";
import studentRoutes from "./routes/studentRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "../src/views"));

app.use(express.urlencoded({ extended: true }));

app.use("/", studentRoutes);



dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
