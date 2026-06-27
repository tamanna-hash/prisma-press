import { Router } from "express";
import { userController } from "./user.controller";

const router = Router()
router.post('/register', userController.registerUser)
router.get('/',userController.getAllUser)
export const userRoutes = router 