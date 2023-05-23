const express = require('express')
const dotenv = require("dotenv").config();
const contactRouter = require('./routes/contactRoutes');
const userRouter = require("./routes/userRoutes")
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/connection');
const app = express()

app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/user", userRouter)
app.use(errorHandler)
console.log(process.env.PORT)
connectDb(process.env.CONNECTION_STRING)

const port = process.env.PORT || 5500;


app.listen(port, () => console.log("listening on port ",port))
