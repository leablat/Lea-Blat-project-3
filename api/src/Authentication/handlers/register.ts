import { pool } from "../../../../database"
import { ResultSetHeader } from "mysql2"
interface IPayload {
    password: string,
    email: string,
    firstName: string,
    lastName: string
}

async function signUp(signUpPayload: IPayload): Promise<number> {
    const { email, firstName, lastName, password } = signUpPayload
    if (typeof email !== 'string' ||
        typeof firstName !== 'string' ||
        typeof lastName !== 'string' ||
        typeof password !== 'string') throw new Error("not valid types")
    try {
        const query = "INSERT INTO `vacations`.`users` (`firstName`, `lastName`, `email`, `password`, `role`) VALUES (?,?,?,?,?)";
        const result = await pool.execute(query, [firstName, lastName, email, password, "user"])
        const [data] = result;
        return (data as ResultSetHeader).insertId
    } catch (e) {
        throw Error(e)
    }
}

export { signUp }
