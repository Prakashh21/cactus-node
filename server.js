const express = require('express')
const dotenv = require("dotenv");
const router = require('./routes/contactRoutes');

const app = express()

// app.get("/",(req , res) => res.send("hello express"));
app.use(express.json());
app.use("/api/", router);


const port = process.env.port || 5500;


app.listen(port, () => console.log("listening on port 5500"))
