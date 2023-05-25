const express = require("express")
const { registerUser, loginUser, currentUser, allUsers } = require("../controllers/userRoutes")
const tokenHandler = require("../middleware/validateTokenHandler")
const router = express.Router()

router.post("/register",registerUser)
      .post("/login",loginUser)
      .get("/current", tokenHandler, currentUser)
      .get("/allUsers",allUsers)


module.exports = router