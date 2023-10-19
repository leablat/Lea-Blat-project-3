import { pool } from "../../../../database"

export async function getUserByEmail(email: string): Promise<any> {
    try {
        if (!email) throw new Error("getUserByEmail() Fn missing Email")
        if (typeof email !== 'string') throw new Error("email is not a valid string")
        const query = `SELECT * FROM vacations.users where email = ?`
        const [data] = await pool.execute(query, [email])
        return data && data[0]
    } catch (e) {
        throw Error(e)
    }
}

export async function login(email: string, password: string): Promise<any> {
    const userRecord = await getUserByEmail(email);
    if (!userRecord) {
        return null
    };
    return userRecord;
}