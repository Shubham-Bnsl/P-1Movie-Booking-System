import express, { json, Router, urlencoded } from "express"

import userRouter from "./src/routes/user.routes.js"
import errorHandlerMiddleware from "./src/middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import adminRouter from "./src/routes/admin.routes.js";
import movieRouter from "./src/routes/movie.routes.js";
import hallRouter from "./src/routes/hall.routes.js";
import seatRouter from "./src/routes/seat.routes.js";
import showRouter from "./src/routes/show.routes.js";
import { ticketRouter } from "./src/routes/ticket.routes.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/hall",hallRouter);
app.use("/seat",seatRouter);
app.use("/show",showRouter);
app.use("/ticket",ticketRouter);



app.use(errorHandlerMiddleware)





export default app;