import expresss from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller";
import userAuth from "../middlewares/auth.middleware";

const router = expresss.Router();

router.route("/")
    .get(userAuth, getProfile)
    .patch(userAuth, updateProfile);

export default router;