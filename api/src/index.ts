import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { vacationsRouter } from "./vacations/route";
import jsonwebtoken from "jsonwebtoken"
import { authRouter } from "./Authentication/route";
import { followersRouter } from "./followers/route";
import { commentsRouter } from "./Comments/route";

dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())
app.use("/auth", authRouter)
app.use(verifyAuthentication)
app.use("/vacations", vacationsRouter)
app.use("/followers", followersRouter)
app.use("/comments", commentsRouter)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log({ message: err.message })
    res.status(500).send("Something went wrong")
})

app.listen(process.env.PORT, () => {
   console.log({ message: `Api is running on Port ${process.env.PORT}` })
})

function verifyAuthentication(req: Request, res: Response, next) {
    const { authorization: token } = req.headers
    
    jsonwebtoken.verify(token, process.env.SECRET, function (err, decoded: any) {
        if (err) {
            return res.status(401).send("Authentication error")
        } else {
            
            
            (req as any).currentUserName = decoded.userName;
            (req as any).currentUserId = decoded.userId;
            (req as any).currentUserRole = decoded.role;
            return next()
        }
    });
}
