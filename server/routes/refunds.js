import express from "express";
import { createRefund } from "../controllers/createRefund.js";
const router = express.Router();

router.post("/create-refund", createRefund);

export default router;
