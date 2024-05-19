import React, { useEffect, useState } from "react";
import { Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
import Cart from "./cart";

interface PaymentProps {
	stripePromise: Promise<Stripe | null>;
}

const Payment: React.FC<PaymentProps> = ({ stripePromise }) => {
	const [clientSecret, setClientSecret] = useState<string>("");

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		// fetch("http://localhost:8080/api/payments/create-payment-intent")
		// 	.then((res) => res.json())
		// 	.then(({ clientSecret }) => setClientSecret(clientSecret));
		const fetchClientSecret = async () => {
			const res = await fetch(
				"http://localhost:8080/api/payments/create-payment-intent",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						amount: 5000,
						currency: "usd",
					}),
				}
			);
			const { client_secret } = await res.json();
			setClientSecret(client_secret);
		};
		fetchClientSecret();
	}, []);

	return (
		<div className="w-full  flex flex-col items-center justify-center p-5 text-dark-terminal-color">
			<h1 className="text-2xl font-bold mb-5">Payment</h1>
			{clientSecret && stripePromise ? (
				<div className="w-full flex items-start justify-center gap-4">
					<Cart />
					<Elements stripe={stripePromise} options={{ clientSecret }}>
						<CheckoutForm />
					</Elements>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default Payment;
