import express, { Request, Response, NextFunction } from "express";
import varifyIsAdmin from "../Authorization/handlers/varifyIsAdmin";
import { getReportData } from "./handlers/getReportData";

const reportsRouter = express.Router()
reportsRouter.use(varifyIsAdmin)
reportsRouter.get("/", getReports);

async function getReports(req: any, res: Response, next: NextFunction) {
    try {

console.log("get report");

        const reportData = await getReportData();
        res.json({ reportData: reportData });
    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}







export { reportsRouter }


