const express = require('express')
const dotenv = require("dotenv").config();
const router = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express()

// app.get("/",(req , res) => res.send("hello express"));
app.use(express.json());
app.use("/api/", router);
app.use(errorHandler)
console.log(process.env.PORT)

const port = process.env.PORT || 5500;


app.listen(port, () => console.log("listening on port ",port))
