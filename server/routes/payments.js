import express from "express";
import { createAuthorization } from "../controllers/createAuthorization.js";
import { createCapturePayment } from "../controllers/createCapturePayment.js";
import { createPaymentIntent } from "../controllers/createPaymentIntent.js";
import { createRecurringPayment } from "../controllers/createRecurringPayment.js";
const router = express.Router();

router.post("/create-authorization", createAuthorization);
router.post("/create-capture-payment", createCapturePayment);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-recurring-payment", createRecurringPayment);

export default router;
