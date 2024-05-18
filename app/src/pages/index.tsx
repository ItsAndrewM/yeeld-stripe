import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/checkoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const HomePage = () => {
	return (
		<Elements
			stripe={stripePromise}
			options={{ clientSecret: import.meta.env.VITE_CLIENT_SECRET }}
		>
			<CheckoutForm />
		</Elements>
	);
};

export default HomePage;
