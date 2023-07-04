const express = require("express");
const Connectdb = require("./Config/dbConnection.js");
const errorH = require("./middleware/errorhandler.js");
const dotenv = require("dotenv").config();
Connectdb();

const app = express();
const port  = process.env.PORT;
app.use(express.json());
app.use("/api/contacts",require("./routes/contact_routes.js"))
app.use("/api/users",require("./routes/user_routes.js"))
app.use(errorH);
app.listen(port,()=>{
    console.log('server is listening')
});