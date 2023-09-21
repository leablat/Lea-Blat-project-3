import express, { Request, Response, NextFunction } from "express";
import { addFollower } from "./handlers/addFollower";
import { deletionFollower } from "./handlers/deleteFollower";
import { getFollowerById } from "./handlers/getFollowerById";
import { getReportData } from "./handlers/getReportData";

const followersRouter = express.Router();
followersRouter.get("/report", getReport);
followersRouter.get("/:id", getFollower)
followersRouter.post("/new", addNewFollowers);
followersRouter.delete("/:id", deleteFollowers)

async function getReport(req: any, res: Response, next: NextFunction) {
    try {
        // if (!isAdmin(req)) {
        //     res.status(401).json({ message: "you are not admin." });
        //     return;
        // }
console.log("get report");

        const reportData = await getReportData();
        res.json({ reportData: reportData });
    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}


async function getFollower(req: any, res: Response, next: NextFunction) {
    const vacationId = Number(req.params.id);
    try {
        const result: any = await getFollowerById(vacationId, req.currentUserId);
        let [data] = result;
        if (data.length === 0)
            return res.send({});
        res.send(data[0])
    }
    catch (err) {
        res.status(500).send("get went wrong")
    }

}

async function addNewFollowers(req: any, res: Response, next: NextFunction) {
    const vacationId = req.body.vacationId
    console.log("userid", req.currentUserId);

    const result = await addFollower(vacationId, req.currentUserId)

    res.json({})


}

async function deleteFollowers(req: any, res: Response, next: NextFunction) {
    const vacationId = Number(req.params.id);
    console.log("delete");
    try {
        await deletionFollower(vacationId, req.currentUserId);
        res.json({ message: "Followers delete successfully." });
    }
    catch (err) {
        res.status(500).send("delete went wrong")
    }

}

export { followersRouter }


