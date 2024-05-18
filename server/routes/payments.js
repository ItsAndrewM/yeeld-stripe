import express from "express";
import { createAuthorization } from "../controllers/createAuthorization.js";
import { createCapturePayment } from "../controllers/createCapturePayment.js";
const router = express.Router();

router.post("/create-authorization", createAuthorization);
router.post("/create-capture-payment", createCapturePayment);

export default router;
