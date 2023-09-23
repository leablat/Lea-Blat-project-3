import { verbose } from "winston";

function verifyIsAdmin(req: any, res: any, next) {
console.log("isAdmin", req.currentUserRole);
    
    if (req.currentUserRole != "admin") {
        console.log("vvvvvvv");
        
        return res.status(403).send("Authentication error")
    }

    return next()

}

export default verifyIsAdmin
