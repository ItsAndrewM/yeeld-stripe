import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import createCustomerRoutes from "./routes/customer.js";
import paymentsRoutes from "./routes/payments.js";
import refundRoutes from "./routes/refunds.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/customers", createCustomerRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/refunds", refundRoutes);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT || 8080, () => {
	console.log("Server is running on port 8080");
});
