import userModels from "../models/userModels.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // validate the user details
    if (!name) {
      res.send({ message: "Name is required" });
    }
    if (!email) {
      res.send({ message: "Email is required" });
    }
    if (!password) {
      res.send({ message: "Password is required" });
    }
    if (!phone) {
      res.send({ message: "Phone is required" });
    }
    if (!address) {
      res.send({ message: "Address is required" });
    }
    if (!answer) {
      res.send({ message: "Answer is required" });
    }

    //Check for existing user
    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      res.status(200).send({
        success: false,
        message: "Email already registered. Please Login.",
      });
    }

    // Register User
    const hashedPass = await hashPassword(password);

    // Save user to database

    const user = await new userModels({
      name,
      email,
      password: hashedPass,
      phone,
      address,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration not successful",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validate
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid login details",
      });
    }
    // Check user in database

    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid login details",
      });
    }

    //Token generation

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid login details",
      error,
    });
  }
};

// For forgot password

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "Email is required",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "Answer is required",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "New Password is required",
      });
    }

    const user = await userModels.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "Wrong email or answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModels.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password is changed successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
