import express from "express";
import { sendConnectionRequest, respondToConnectionRequest } from "../controllers/request.controller";
import userAuth from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/send/:status/:toUserId", userAuth, sendConnectionRequest);
router.post("/review/:status/:requestId", userAuth, respondToConnectionRequest);


export default router;