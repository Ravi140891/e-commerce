import express from "express";
import { requireSignIn } from "../middlewares/authMiddleWare.js";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controllers/authController.js";

const router = express.Router();

// For Registration || POST method

router.post("/register", registerController);

// For Login

router.post("/login", loginController);

// For Forgot password

router.post("/forgot-password", forgotPasswordController);

//protected routs auth

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
