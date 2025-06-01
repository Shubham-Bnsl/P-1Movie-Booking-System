import express, { json, Router, urlencoded } from "express"
import 'dotenv/config'
import router from "./src/routes/user.routes.js"

const app = express()

app.use(express.static("public"));

app.use("/user",router);




// app.use("/",(req, res) => {
//   res.send('GET request to the homepage')
// });




export default app;