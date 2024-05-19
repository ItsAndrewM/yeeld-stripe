import { loadStripe } from "@stripe/stripe-js";
import Completion from "../../components/completion";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CompletionPage = () => {
	return <Completion stripePromise={stripePromise} />;
};

export default CompletionPage;
