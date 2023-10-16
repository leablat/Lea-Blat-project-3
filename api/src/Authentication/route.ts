
import express from "express"
import jsonwebtoken from "jsonwebtoken"
import zod from "zod"
import dotenv from "dotenv"
import { login } from "./handlers/login"
import { signUp } from "./handlers/register"
dotenv.config()
const authRouter = express.Router();

// authRouter.get("/test", test)
authRouter.post("/login", loginFunc)
authRouter.post("/sign-up", signUpFunc)

const users = [{ email: "root@root.com", password: "admin" }];

export const signupSchema = zod.object({
    email: zod.string(),
    password: zod.string(),
    firstName: zod.string().max(100),
    lastName: zod.string().max(100)
})

const loginSchema = zod.object({
    email: zod.string(),
    password: zod.string(),

})

function middlewareLogin(req, res, next) {
    try {
        loginSchema.parse(req.body)
        return next()
    } catch (error) {
        return res.status(400).send("Error")
    }
}
function test(req, res, next) {
    console.log("test");
    res.send("sdlijflds");
}

async function loginFunc(req, res, next) {
    const { email, password } = req.body
    try {
        const { result, userRecord } = await login(email, password);
        if (!userRecord)
            return res.status(404).send("User is undefined")
        if (!result) throw new Error()
        const signedToken = await jsonwebtoken.sign({ userName: userRecord.firstName + " "+userRecord.lastName, userId: userRecord.userId, role: userRecord.role }, process.env.SECRET)
        console.log("signedToken",signedToken);
        res.json({ token: signedToken })
    } catch (error) {
        return res.status(401).send("User is unauthorized")
    }
}

function middlewareSignIn(req, res, next) {
    console.log(" bfcg");

    try {
        signupSchema.parse(req.body)
        return next()
    } catch (error) {
        return res.status(400).send("Error")
    }
}

async function signUpFunc(req, res, next) {
    try {
        console.log("0");
        // const user = users.find(u => u.email === req.body?.email?.toLowerCase())
        // if (user) return res.status(409).send("user already exist")
        const result = await signUp(req.body)
        console.log("User added id", result)
        return res.json({ message: "user successfully added!" })
    } catch (error) {
        return next(error)
    }
}


export { authRouter };