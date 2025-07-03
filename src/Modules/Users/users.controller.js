import { Router } from "express";
import * as userService from "./users.service.js";

const router = Router();

router.put("/:id", userService.updateUser);
router.get("/by-email", userService.findUserByEmail);
router.get("/:id", userService.findUserByPK);

export default router;
