import express from "express";
import userAuth from "../middlewares/auth.middleware";
import getChat from "../controllers/chat.controller";

const router = express.Router();

router.get("/:targetUserId", userAuth, getChat);

export default router;