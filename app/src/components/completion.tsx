import React, { useEffect, useState } from "react";
import { Stripe } from "@stripe/stripe-js";

interface CompletionProps {
	stripePromise: Promise<Stripe | null>;
}

const Completion: React.FC<CompletionProps> = ({ stripePromise }) => {
	const [messageBody, setMessageBody] = useState<string>("");

	useEffect(() => {
		if (!stripePromise) return;

		stripePromise.then(async (stripe) => {
			if (!stripe) return;

			const url = new URL(window.location.href);
			const clientSecret = url.searchParams.get("payment_intent_client_secret");
			if (!clientSecret) return;

			const { error, paymentIntent } = await stripe.retrievePaymentIntent(
				clientSecret
			);

			setMessageBody(
				error ? (
					`> ${error.message}`
				) : (
					<>
						&gt; Payment {paymentIntent?.status}:{" "}
						<a
							href={`https://dashboard.stripe.com/test/payments/${paymentIntent?.id}`}
							target="_blank"
							rel="noreferrer"
						>
							{paymentIntent?.id}
						</a>
					</>
				)
			);
		});
	}, [stripePromise]);

	return (
		<div className="flex flex-col items-center justify-center p-5 text-dark-terminal-color">
			<h1 className="text-2xl font-bold mb-5">Thank you!</h1>
			<a href="/" className="text-accent-color font-black mb-5">
				home
			</a>
			<div
				id="messages"
				role="alert"
				className={`font-mono bg-dark-terminal-color text-green-500 p-5 my-5 rounded-md text-sm ${
					messageBody ? "block" : "hidden"
				}`}
			>
				{messageBody}
			</div>
		</div>
	);
};

export default Completion;
