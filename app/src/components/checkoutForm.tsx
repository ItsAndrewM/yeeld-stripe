import {
	PaymentElement,
	LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import React from "react";
import Spinner from "./spinner";

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [message, setMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: `${window.location.origin}/completion`,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (
			error &&
			(error.type === "card_error" || error.type === "validation_error")
		) {
			setMessage(error.message ?? "An error occurred");
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	return (
		<form
			id="payment-form"
			onSubmit={handleSubmit}
			className="w-full max-w-lg flex flex-col items-center justify-center gap-4 border border-light-grey rounded-md p-5 my-5 shadow-lg"
		>
			<LinkAuthenticationElement id="link-authentication-element" />
			<PaymentElement id="payment-element" />
			<button
				disabled={isLoading || !stripe || !elements}
				id="submit"
				className="bg-accent-color rounded-md text-black border border-black hover:bg-black hover:text-white py-3 px-4 mt-4 font-semibold cursor-pointer transition-all duration-200 ease-in-out w-full disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<span id="button-text">{isLoading ? <Spinner /> : "Pay now"}</span>
			</button>
			{message && (
				<div
					id="payment-message"
					className="font-mono bg-dark-terminal-color text-green-500 p-5 my-5 rounded-md text-sm"
				>
					{message}
				</div>
			)}
		</form>
	);
}
