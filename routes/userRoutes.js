const express = require("express")
const { registerUser, loginUser, currentUser, allUsers } = require("../controllers/userRoutes")
const router = express.Router()

router.post("/register",registerUser)
      .post("/login",loginUser)
      .post("/current",currentUser)
      .get("/allUsers",allUsers)


module.exports = router