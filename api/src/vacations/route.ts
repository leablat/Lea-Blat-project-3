import express, { Request, Response, NextFunction } from "express";
import { getAllVacations } from "./handlers/getAllVacations";
import { addVacation } from "./handlers/addVacation";
import { updateVacation } from "./handlers/editVacation";
import { deletionVacation } from "./handlers/deleteVacations";
import varifyIsAdmin from "../Authorization/handlers/varifyIsAdmin";


const vacationsRouter = express.Router();

vacationsRouter.get("/",getVacations )
vacationsRouter.use(varifyIsAdmin)
vacationsRouter.post("/new", newVacation)
vacationsRouter.put("/:id", updateExistingVacation)
vacationsRouter.delete("/:id", deleteVacation)

async function getVacations(req: Request, res: Response, next: NextFunction){
  
    try {
        const results = await getAllVacations()
        res.json(results)
    } catch (error) {
        console.log(error.message)
        return next(error)
    }
}

async function newVacation(req: Request, res: Response, next: NextFunction){

    const vacation = req.body

    const result = await addVacation (vacation)

    res.json(result)
}

async function updateExistingVacation(req: Request, res: Response, next: NextFunction) {
    try {
    const vacationId = Number(req.params.id); 
    const updatedData = req.body;

    
       await updateVacation(vacationId, updatedData);
        res.json({ message: "Vacation updated successfully." });
       
        
    } catch (error) {
        console.log(error.message);
        return next(error);
    }
}

async function deleteVacation (req: Request, res: Response, next: NextFunction){
    try {
       console.log("sldfjldsjfl");
       
            const vacationId = Number(req.params.id); 
        
            
               await deletionVacation(vacationId);
                res.json({ message: "Vacation delete successfully." });
               
                
            } catch (error) {
                console.log(error.message);
                return next(error);
            }           
            
        }

export { vacationsRouter};