import express, { Request, Response, NextFunction } from "express";
import { addFollower } from "./handlers/addFollower";
import { deletionFollower } from "./handlers/deleteFollower";
import { getFollowerById } from "./handlers/getFollowerById";

const followersRouter = express.Router();
followersRouter.get("/:id", getFollower)
followersRouter.post("/new", addNewFollowers);
followersRouter.delete("/:id", deleteFollowers)

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
        res.status(500).send("get follower went wrong")
    }
}

async function addNewFollowers(req: any, res: Response, next: NextFunction) {
    const vacationId = req.body.vacationId
    if (!vacationId)
        res.status(500).send("vacationId is missing")
    try {
        await addFollower(vacationId, req.currentUserId)
        res.status(200).send("add follower successfuly")
    }
    catch (err) {
        res.status(500).send("Add follower failed....")
    }
}

async function deleteFollowers(req: any, res: Response, next: NextFunction) {
    const vacationId = Number(req.params.id);
    if (!vacationId)
        throw new Error("valid vacationId is missing")
    try {
        await deletionFollower(vacationId, req.currentUserId);
        res.status(200).send("delete follower failed");
    }
    catch (err) {
        res.status(500).send("delete went wrong")
    }
}

export { followersRouter }


