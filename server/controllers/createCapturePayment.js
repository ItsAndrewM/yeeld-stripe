import stripe from "../config/stripe.js";

export const createCapturePayment = async (req, res) => {
	const { authorization } = req.body;
	if (!authorization) {
		return res
			.status(400)
			.json({ success: false, error: "Missing authorization" });
	}
	try {
		const payment = await stripe.paymentIntents.capture(authorization);
		if (!payment.id) {
			return res
				.status(500)
				.json({ success: false, error: "Payment capture failed" });
		}
		res.status(200).json({ success: true, payment: payment.id });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
