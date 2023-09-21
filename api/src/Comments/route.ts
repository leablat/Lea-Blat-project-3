import express, { Request, Response, NextFunction } from "express";
import {getCommentsByVacationId} from './handlers/getCommentsByVacationId'

const commentsRouter = express.Router();
commentsRouter.get("/:vacationId", getComments)
commentsRouter.post("/:vacationId", getComments)

async function getComments(req: any, res: Response, next: NextFunction) {
    console.log("comment");
    
    const vacationId = Number(req.params.vacationId);
    try {
        const result: any = await getCommentsByVacationId(vacationId);
        let [data] = result;
        if (data.length === 0)
            return res.send([]);
        res.send(data)
    }
    catch (err) {
        res.status(500).send("get went wrong")
    }

}

async function addNewComment(req: any, res: Response, next: NextFunction) {
    const vacationId = req.body.vacationId
    console.log("userid", req.currentUserId);

    // const result = await addFollower(vacationId, req.currentUserId)

    res.json({})


}



export { commentsRouter }


