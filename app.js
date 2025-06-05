import express, { json, Router, urlencoded } from "express"

import router from "./src/routes/user.routes.js"
import errorHandlerMiddleware from "./src/middlewares/errorHandler.Middleware.js";
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser())


app.use("/user",router);



app.use(errorHandlerMiddleware)





export default app;