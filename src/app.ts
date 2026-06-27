import express, { Application, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";
const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get("/", (req: Request, res: Response) => {
  res.send("HElo");
});
app.use('/api/user',userRoutes)
export default app;
