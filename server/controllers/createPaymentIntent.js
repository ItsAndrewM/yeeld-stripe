import stripe from "../config/stripe.js";

export const createPaymentIntent = async (req, res) => {
	const { amount, currency } = req.body;
	if (!amount || !currency) {
		return res
			.status(400)
			.json({ success: false, error: "Missing amount or currency" });
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency,
	});
	if (!paymentIntent.id) {
		return res
			.status(500)
			.json({ success: false, error: "Failed to create payment intent" });
	}

	return res.status(200).json({
		success: true,
		client_secret: paymentIntent.client_secret,
		id: paymentIntent.id,
	});
};
