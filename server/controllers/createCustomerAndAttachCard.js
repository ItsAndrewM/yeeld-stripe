import stripe from "../config/stripe.js";

export const createCustomerAndAttachCard = async (req, res) => {
	const { email, name, phone } = req.body;
	if (!email || !name || !phone) {
		return res
			.status(400)
			.json({ success: false, error: "Missing email, name or phone" });
	}
	try {
		const customer = await stripe.customers.create({
			description: "Example customer",
			email,
			name,
			phone,
		});
		if (!customer.id) {
			return res
				.status(500)
				.json({ success: false, error: "Customer creation failed" });
		}
		const card = await stripe.paymentMethods.attach(
			"pm_card_visa", // Stripes test card
			{ customer: customer.id }
		);
		if (!card.id) {
			return res
				.status(500)
				.json({ success: false, error: "Card creation failed" });
		}
		res
			.status(200)
			.json({ success: true, customer: customer.id, card: card.id });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
