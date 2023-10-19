
import express from "express"
import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
import { getUserByEmail, login } from "./handlers/login"
import { signUp } from "./handlers/register"
dotenv.config()
const authRouter = express.Router();

authRouter.post("/login", loginFunc)
authRouter.post("/sign-up", signUpFunc)

async function loginFunc(req, res, next) {
    const { email, password } = req.body
    if (!email || !password)
        throw new Error()
    try {
        const userRecord = await login(email, password);
        if (!userRecord)
            return res.status(404).send("User is undefined")
        const signedToken = await jsonwebtoken.sign({ userName: userRecord.firstName + " " + userRecord.lastName, userId: userRecord.userId, role: userRecord.role }, process.env.SECRET)
        res.json({ token: signedToken })
    } catch (error) {
        return res.status(401).send("User is unauthorized")
    }
}

async function signUpFunc(req, res, next) {
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName)
        throw new Error()
    try {
        const user = await getUserByEmail(req.body.email)
        if (user) {
            return res.status(409).send({ message: "this email already exists" })
        }
        const result = await signUp(req.body)
        return res.json({ message: "user successfully added!" })
    } catch (error) {
        return next(error)
    }
}

export { authRouter };