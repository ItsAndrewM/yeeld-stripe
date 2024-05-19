import stripe from "../config/stripe.js";
export const createRecurringPayment = async (req, res) => {
	const { customerId } = req.body;
	if (!customerId) {
		return res.status(400).json({ success: false, error: "No customerId" });
	}
	try {
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Streaming Service Subscription",
						},
						unit_amount: 4400,
						recurring: { interval: "month" },
					},
					quantity: 1,
				},
			],
			customer: customerId,
			mode: "subscription",
			success_url: "https://example.com/success",
			cancel_url: "https://example.com/cancel",
		});
		if (!session) {
			return res.status(500).json({ success: false, error: "No session" });
		}
		return res.status(200).json({ success: true, sessionId: session.id });
	} catch (err) {
		return res.status(500).json({ success: false, error: err.message });
	}
};
