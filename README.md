# Stripe Integration Project

This project demonstrates integration with Stripe for creating customers, handling payments, and managing refunds. The repository contains both a Vite React application and an Express server, showcasing the use of Stripe's API and web components.

## Table of Contents

- Installation
- Usage
- API Endpoints
- Stripe Integration
- License

## Installation

### Prerequisites

- Node.js
- npm or yarn
- A Stripe account for testing purposes

### Backend Setup

1. Clone the repository:
   git clone https://github.com/your-repo/stripe-integration.git
   cd stripe-integration/server

2. Install the dependencies:
   npm install

3. Create a `.env` file in the `/server` directory and add your Stripe secret key:
   STRIPE_SECRET_KEY=your_stripe_secret_key
   PORT=8080

4. Start the server:
   npm start

### Frontend Setup

1. Navigate to the `/app` directory:
   cd ../app

2. Install the dependencies:
   npm install

3. Start the Vite development server:
   npm run dev

## Usage

- The backend server will run on `http://localhost:8080`.
- The frontend Vite app will run on `http://localhost:5173`.

## API Endpoints

### Customer Routes

- `POST /api/customers/create-customer` - Create a customer and attach a card.

### Payment Routes

- `POST /api/payments/create-payment-intent` - Create a PaymentIntent to charge a customer.
- `POST /api/payments/capture-payment` - Capture a previously created payment.

### Refund Routes

- `POST /api/refunds/create-refund` - Create a refund for a charge.

## Stripe Integration

### Backend (Express)

#### `index.js`

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import createCustomerRoutes from "./routes/customer.js";
import paymentsRoutes from "./routes/payments.js";
import refundRoutes from "./routes/refunds.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/customers", createCustomerRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/refunds", refundRoutes);

app.get("/", (req, res) => {
res.send("Hello World!");
});

app.listen(process.env.PORT || 8080, () => {
console.log("Server is running on port 8080");
});

### Frontend (Vite React App)

The `/app` directory contains the Vite React app, which integrates Stripe web components and elements for handling payments.

### Creating Customers and Payments

import express from "express";
import { createCustomerAndAttachCard } from "../controllers/createCustomerAndAttachCard.js";

const router = express.Router();

router.post("/create-customer", createCustomerAndAttachCard);

export default router;

#### Create Customer Controller

import stripe from "stripe";
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export const createCustomerAndAttachCard = async (req, res) => {
try {
const { name, email, phone } = req.body;
const customer = await stripeClient.customers.create({
name,
email,
phone,
});
const paymentMethod = await stripeClient.paymentMethods.attach(
'pm_card_visa',
{ customer: customer.id }
);
res.status(200).json({ customer, paymentMethod });
} catch (error) {
res.status(500).json({ error: error.message });
}
};

### Handling Payments and Refunds

The routes and controllers for payments and refunds are similarly set up. Refer to the `/server/routes/payments.js` and `/server/routes/refunds.js` for more details.

## License

This project is licensed under the MIT License.
