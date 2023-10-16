import { signupSchema } from "../route"
import bcrypt from "bcrypt";
import { pool } from "../../../../database"
import { ResultSetHeader } from "mysql2"
import dotenv from "dotenv"
import express from "express";

interface IPayload {
    password: string,
    email: string,
    firstName: string,
    lastName: string
}
const saltRounds = 10
async function signUp(signUpPayload: IPayload): Promise<number> {
    
    const { email, firstName, lastName, password } = signUpPayload
    // הצפנה לסיסמא
    console.log("sign up ");

    const hashedPassword = await getHashedPassword(password)
console.log(hashedPassword);



    console.log("sign up 2");
    const query = "INSERT INTO `vacations`.`users` (`firstName`, `lastName`, `email`, `password`, `role`,`hashedPassword`, `salt`) VALUES (?,?,?,?,?,?,?)";
    const result = await pool.execute(query, [firstName, lastName, email, password, "user",hashedPassword.password,hashedPassword.salt  ])
    console.log("sign up 3");
  
    const [data] = result;
    return (data as ResultSetHeader).insertId
}

async function getHashedPassword(password: string, salt?: string): Promise<{ password: string, salt?: string }> {
    const s = salt || bcrypt.genSaltSync(saltRounds)
    const hashed = await bcrypt.hash(password, s)
    return { password: hashed, salt: s }
}

export {signUp, getHashedPassword}
