import express, { Request, Response, NextFunction } from "express";
import varifyIsAdmin from "../authorization/handlers/varifyIsAdmin";
import { getReportData } from "./handlers/getReportData";

const reportsRouter = express.Router()
reportsRouter.use(varifyIsAdmin)
reportsRouter.get("/", getReports);

async function getReports(req: any, res: Response, next: NextFunction) {
    try {
        const reportData = await getReportData();
        return res.json({ reportData: reportData });
    } catch (error) {
        res.status(500).send("get reports failed" + error)
    }
}








export { reportsRouter }


