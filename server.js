const express = require('express')
const app = express()

app.get("/",(req , res) => res.send("hello express"));


app.listen("5500", () => console.log("listening on port 5500"))
