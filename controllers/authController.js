import userModels from "../models/userModels.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // validate the user details
    if (!name) {
      res.send({ error: "Name is required" });
    }
    if (!email) {
      res.send({ error: "Email is required" });
    }
    if (!password) {
      res.send({ error: "Password is required" });
    }
    if (!phone) {
      res.send({ error: "Phone is required" });
    }
    if (!address) {
      res.send({ error: "Address is required" });
    }

    //Check for existing user
    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      res.status(200).send({
        success: true,
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
