import { pool } from "../../../../database"

async function getReportData() {
    try {
        const query = `SELECT distinct
                        v.destination,
                        IFNULL(likes.sum, 0) as followers
                        -- IFNULL(checks.isCheck, 0) as isLiked
                        FROM
                            vacations.vacations v
                        LEFT JOIN (
                            SELECT vacationId, COUNT(*) as sum FROM vacations.followers GROUP BY vacationId
                        ) likes ON v.vacationId = likes.vacationId`
        const [results] = await pool.execute(query);
        return results;
    }
    catch (e) {
        throw new Error(e)
    }
}

export { getReportData }