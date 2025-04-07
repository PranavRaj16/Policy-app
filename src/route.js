import express from "express";
import { getAllUserPolicies, getPolicyOfUser, uploadXl } from "./controller/insurance.controller.js";
import { upload } from "./config/multer.config.js";
import { scheduleMessage } from "./controller/message.controller.js";

const router = express.Router();


// insurance
router.post("/upload", upload.single("file"), uploadXl);

router.get("/policy/:username", getPolicyOfUser);

router.get("/getalluserpolicies", getAllUserPolicies);

//messaging

router.post("/schedule-message", scheduleMessage);

export default router;
