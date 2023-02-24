import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

const router = express.Router();

// For Registration || POST method

router.post("/register", registerController);

// For Login

router.post("/login", loginController);

export default router;
