import express from "express";
import { createCustomerAndAttachCard } from "../controllers/createCustomerAndAttachCard.js";

const router = express.Router();

router.post("/create-customer", createCustomerAndAttachCard);

export default router;
