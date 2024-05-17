import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT || 8080, () => {
	console.log("Server is running on port 8080");
});
