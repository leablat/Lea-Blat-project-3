import { pool } from "../../database"
import { getSumOfFollowers } from "../../followers/handlers/getSumOfFollowers";


async function getAllVacations(userId: number, isUSerFollow: any, isNotStarted: boolean, isActive: boolean) {
    
    let conditions = isUSerFollow ? ` IsUSerFollow = 1 and` : ``;
    conditions += isNotStarted ? ` v.startDate > curdate() and` : ``;
    conditions += isActive ? ` (v.startDate < curdate() and curdate() < v.endDate) and` : ``;
    conditions = conditions.slice(0, -4);
    console.log('conditins', conditions);


    const query = `
    select *, (select count(*) 
               from followers as f 
               where v.vacationId = f.vacationId and f.userId = ${userId}) as IsUSerFollow
    FROM vacations.vacations as v
     ${conditions? ` having ${conditions}`: ``}
    order by startDate

    
    `
    const results = await pool.execute(query);
    const [data] = results;
    if (!Array.isArray(data)) { throw new Error("Data is not an array"); }
    let sumOfFollowers: any[] = await getSumOfFollowers();
    data.map((vacation) => {
        return  vacation.followers = sumOfFollowers[0].find((followers) => { return followers.vacationId === vacation.vacationId; })?.cnt;
        
    });

    return data;
}





export { getAllVacations }