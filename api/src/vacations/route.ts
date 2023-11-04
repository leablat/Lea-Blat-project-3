import express, { Request, Response, NextFunction } from "express";
import { getAllVacations } from "./handlers/getAllVacations";
import { addVacation } from "./handlers/addVacation";
import { updateVacation } from "./handlers/editVacation";
import { deleteVacation } from "./handlers/deleteVacations";
import { getVacationById } from "./handlers/getVacationById";
import { deleteFollowersByVacatuonId as deleteFollowersByVacationId } from "../followers/handlers/deleteFollowersByVacatuonId";
import { coerce, object, string } from "zod";
import varifyIsAdmin from "../authorization/handlers/varifyIsAdmin";

const vacationsRouter = express.Router();

const newVacationSchema = object({
    destination: string().nonempty('destination must be filled!'),
    description: string().nonempty('description must be filled!'),
    startDate: coerce.date().min(new Date(Date.now()), 'Start date must be after today'),
    endDate: coerce.date(),
    price: coerce.number().nonnegative("canot get negative price").min(1, "price must be filled!").max(10000, "canot get more than 10,000"),
    imageFileName: string().nonempty('imageFileName must be filled!'),
}).refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
});

const editVacationSchema = object({
    destination: string().nonempty('destination must be filled!'),
    description: string().nonempty('description must be filled!'),
    startDate: coerce.date(),
    endDate: coerce.date(),
    price: coerce.number().nonnegative("canot get negative price").min(1, "price must be filled!").max(10000, "canot get more than 10,000"),
}).refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
});

vacationsRouter.get("/", getVacations)
vacationsRouter.get("/details/:id", getVacation)
vacationsRouter.use(varifyIsAdmin)
vacationsRouter.post("/new", newVacation)
vacationsRouter.get("/:id", getVacation)
vacationsRouter.put("/:id", editVacation)
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
        newVacationSchema.parse(req.body)
        const vacation = req.body
        const result = await addVacation(vacation)
        console.log(result);
        return res.json(result)
    } catch (error) {
        console.error("Error creating vacation:", error);
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

async function editVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const vacationId = Number(req.params.id);
        editVacationSchema.parse(req.body)
        const updatedData = req.body;
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