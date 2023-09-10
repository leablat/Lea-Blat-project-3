import { pool } from "../../database"
import { getSumOfFollowers } from "../../followers/handlers/getSumOfFollowers";


async function getAllVacations() {

 


    const query = `SELECT * FROM vacations.vacations;`
    const results = await pool.execute(query);
    const [data] = results;
    if (!Array.isArray(data)) { throw new Error("Data is not an array"); }
    let sumOfFollowers: any[] = await getSumOfFollowers();
    console.log(sumOfFollowers[0]);
    data.map((vacation) => {
        return vacation.followers = sumOfFollowers[0].find((followers) => { return followers.vacationId === vacation.vacationId; })?.cnt;
    });
    // console.log("vacations", data) 
    return data;
}





export { getAllVacations }