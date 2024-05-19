import { loadStripe } from "@stripe/stripe-js";
import Payment from "../../components/payment";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const PaymentPage = () => {
	return (
		<div className="container mx-auto flex flex-col items-center justify-center">
			<Payment stripePromise={stripePromise} />
		</div>
	);
};

export default PaymentPage;
