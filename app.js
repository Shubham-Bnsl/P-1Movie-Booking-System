import express, { json, Router, urlencoded } from "express"

import userRouter from "./src/routes/user.routes.js"
import errorHandlerMiddleware from "./src/middlewares/errorHandler.Middleware.js";
import cookieParser from "cookie-parser";
import adminRouter from "./src/routes/admin.routes.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/user",userRouter);
app.use("/admin/movie",adminRouter);



app.use(errorHandlerMiddleware)





export default app;