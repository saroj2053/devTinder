import express from "express";
import userAuth from "../middlewares/auth.middleware";
import { getUserConnectionRequests, getUserConnections, getUserFeed } from "../controllers/user.controller";

const router = express.Router();

router.get("/requests", userAuth, getUserConnectionRequests);
router.get("/connections", userAuth, getUserConnections);
router.get("/feed", userAuth, getUserFeed);

export default router;