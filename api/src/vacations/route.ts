import express, { Request, Response, NextFunction } from "express";
import { getAllVacations } from "./handlers/getAllVacations";
import { addVacation } from "./handlers/addVacation";
import { updateVacation } from "./handlers/editVacation";
import { deleteVacation } from "./handlers/deleteVacations";
import varifyIsAdmin from "../Authorization/handlers/varifyIsAdmin";
import { getVacationById } from "./handlers/getVacationById";
import { deleteFollowersByVacatuonId as deleteFollowersByVacationId } from "../followers/handlers/deleteFollowersByVacatuonId";

const vacationsRouter = express.Router();
vacationsRouter.get("/", getVacations)
vacationsRouter.get("/details/:id", getVacation)
vacationsRouter.use(varifyIsAdmin)
vacationsRouter.post("/new", newVacation)
vacationsRouter.get("/:id", getVacation)
vacationsRouter.put("/:id", updateExistingVacation)
vacationsRouter.delete("/:id", deleteVacationFunc)

async function getVacations(req: any, res: Response, next: NextFunction) {
    try {
        const isUSerFollow = req.query.isUserFollow == "true" ? true : false;
        const isNotStarted = req.query.isNotStarted == "true" ? true : false;
        const isActive = req.query.isActive == "true" ? true : false;
        const results = await getAllVacations(req.currentUserId, isUSerFollow, isNotStarted, isActive)
        return res.json(results)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function newVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const vacation = req.body
        if (!vacation.destination || !vacation.description || !vacation.startDate || !vacation.endDate || !vacation.price || !vacation.imageFileName)
            throw new Error("missing required fields")
        const result = await addVacation(vacation)
        return res.json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const vacationId = Number(req.params.id);
        if (!vacationId)
            throw new Error("missing valid vactaionId")

        const results = await getVacationById(vacationId);
        return res.json(results)
    } catch (error) {
        res.status(500).send(error)
    }

}

async function updateExistingVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const vacationId = Number(req.params.id);
        const updatedData = req.body;
        if (!updatedData.destination || !updatedData.description || !updatedData.startDate || !updatedData.endDate || !updatedData.price || !updatedData.imageFileName)
            throw new Error("missing Data")
        await updateVacation(vacationId, updatedData);
        return res.json({ message: "Vacation updated successfully." });
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteVacationFunc(req: Request, res: Response, next: NextFunction) {
    try {
        const vacationId = Number(req.params.id);
        if (!vacationId)
            throw new Error("missing valid vactaionId")
        await deleteFollowersByVacationId(vacationId);
        await deleteVacation(vacationId);
        return res.json({ message: "Vacation delete successfully." });
    } catch (error) {
        res.status(500).send(error)
    }
}

export { vacationsRouter };