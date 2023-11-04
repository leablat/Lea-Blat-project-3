import express from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserByEmail, login } from "./handlers/login";
import { signUp } from "./handlers/register";
import { object, string } from "zod";

dotenv.config();
const authRouter = express.Router();

const loginSchema = object({
  email: string().email("Invalid email"),
  password: string().min(4,"Password must be at least 4 characters"),
});

const signUpSchema = object({
  email: string().email("Invalid email"),
  firstName: string().nonempty('firstName must be filled!'),
  password: string().min(4, "Password must be at least 4 characters"),
  lastName: string().nonempty('lastName must be filled!'),
});

authRouter.post("/login", loginFunc);
authRouter.post("/sign-up", signUpFunc);

async function loginFunc(req, res, next) {
  try {
    loginSchema.parse(req.body);
  } catch (error) {
    return res.status(400).send(error.errors);
  }
  const { email, password } = req.body;
  try {
    const userRecord = await login(email, password);
    console.log(
    userRecord)
    if (!userRecord) return res.status(404).send("User is undefined");
    if (userRecord.password !== password) {
      return res.status(401).send("Password is not correct");
    }
    const signedToken = await jsonwebtoken.sign(
      {
        userName: userRecord.firstName + " " + userRecord.lastName,
        userId: userRecord.userId,
        role: userRecord.role,
      },
      process.env.SECRET
    );
    res.json({ token: signedToken });
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
}

async function signUpFunc(req, res, next) {
  try {
    signUpSchema.parse(req.body);
  } catch (error) {
    return res.status(400).send(error.errors);
  }
  try {
    const user = await getUserByEmail(req.body.email);
    if (user) {
      return res.status(409).send({ message: "This email already exists" });
    }
    const result = await signUp(req.body);
    return res.json({ message: "User successfully added!" });
  } catch (error) {
    return next(error);
  }
}

export { authRouter };
