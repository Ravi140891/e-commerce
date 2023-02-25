import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log("Server is running on 8000");
});
