import express from "express";

//controller
import { getAllUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.use(protectRoute)


router.get("/", getAllUsers)

export default router