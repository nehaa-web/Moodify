const { Router } = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = Router()

router.post("/registor" , authController.registerUser)

router.post("/login", authController.loginUser)

router.get("/get-me", authMiddleware.authUser ,authController.getMe )

module.exports = router