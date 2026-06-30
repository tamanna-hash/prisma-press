import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../midddelwares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post("/register", userController.registerUser);
router.get("/", userController.getAllUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  userController.getMyProfile,
);
router.put(
  "/my-profile",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  userController.updateMyProfile,
);
export const userRoutes = router;
