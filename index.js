import app from "./app.js";
import dbConnect from "./src/db/index.js";
import 'dotenv/config'

const port =  process.env.PORT_NUMBER;

dbConnect();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

