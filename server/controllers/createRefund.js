import stripe from "../config/stripe.js";

export const createRefund = async (req, res) => {
	const { paymentIntentId, amount } = req.body;
	if (!paymentIntentId || !amount) {
		return res.status(400).json({
			success: false,
			error: "Missing paymentIntentId or amount",
		});
	}
	try {
		const refund = await stripe.refunds.create({
			payment_intent: paymentIntentId,
			amount: amount,
		});
		if (!refund.id) {
			return res
				.status(500)
				.json({ success: false, error: "Refund creation failed" });
		}
		res.status(200).json({ success: true, refund: refund.id });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
