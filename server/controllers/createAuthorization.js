import stripe from "../config/stripe.js";

export const createAuthorization = async (req, res) => {
	const { amount, currency, customer, card, capture_method } = req.body;
	if (!amount || !currency || !customer || !card) {
		return res.status(400).json({
			success: false,
			error: "Missing amount, currency, customer or description",
		});
	}
	try {
		const authorization = await stripe.paymentIntents.create({
			amount: amount, //no decimals
			currency: currency, // Three-letter ISO currency code
			customer: customer, // The customer ID
			capture_method: !capture_method ? "manual" : capture_method, // Set to "manual" to capture payment later or "automatic" to capture immediately
			// source: card, // The card ID
			// capture: false, // Important: Do not capture the charge immediately
		});
		if (!authorization.id) {
			return res
				.status(500)
				.json({ success: false, error: "Authorization creation failed" });
		}
		const paymentIntent = await stripe.paymentIntents.confirm(
			authorization.id,
			{
				payment_method: card,
				return_url: "https://www.example.com",
			}
		);

		if (!paymentIntent.id) {
			return res
				.status(500)
				.json({ success: false, error: "Payment creation failed" });
		}
		res
			.status(200)
			.json({
				success: true,
				authorization: paymentIntent.id,
				client_secret: paymentIntent.client_secret,
			});
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
