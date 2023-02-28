import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getAllOrdersController,
  orderStatusController,
  getOrdersController,
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

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//for profile update

router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
