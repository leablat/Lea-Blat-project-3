import express, { Request, Response, NextFunction } from "express";
import { getCommentsByVacationId } from './handlers/getCommentsByVacationId'
import { addComment } from "./handlers/addComment";

const commentsRouter = express.Router();
commentsRouter.get("/:vacationId", getComments)
commentsRouter.post("/:vacationId", addNewComment)

async function getComments(req: any, res: Response, next: NextFunction) {
    const vacationId = Number(req.params.vacationId);
    try {
        const result: any = await getCommentsByVacationId(vacationId);
        const [data] = result;
        if (data.length === 0)
            return res.send([]);
        res.send(data)
    }
    catch (err) {
        res.status(500).send("get went wrong")
    }
}

async function addNewComment(req: any, res: Response, next: NextFunction) {
    const vacationId = Number(req.params.vacationId);
    const comment = req.body.comment
    const userId = req.currentUserId
    try {
        await addComment(vacationId, comment, userId)
        res.status(200).send("comment added")
    }
    catch (err) {
        res.status(500).send("Add connent failed.... " + err)
    }
}

export { commentsRouter }


