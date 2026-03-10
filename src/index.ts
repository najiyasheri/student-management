import express from "express";
import path from "path";
import studentRoutes from "./routes/studentRoutes";

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "../src/views"));

app.use(express.urlencoded({ extended: true }));

app.use("/", studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
