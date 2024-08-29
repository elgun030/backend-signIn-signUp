import express from "express";
//Controller
import  {sendMessage, getMessages} from "../controllers/message.controller.js"

const router = express.Router();

//middleware
import { protectRoute } from "../middleware/protectRoute.js";


router.use(protectRoute)

router.get("/:talkingToId", getMessages)

router.post("/:talkingToId", sendMessage) 

export default router