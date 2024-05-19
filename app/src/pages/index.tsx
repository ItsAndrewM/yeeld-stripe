import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="container mx-auto flex flex-col items-center justify-center">
			<h1>Hello</h1>
			<Link
				className="border border-black rounded-md bg-accent-color px-4 py-2 text-black hover:bg-black hover:text-white transition-colors duration-300"
				to="/payment"
			>
				Pay Now
			</Link>
		</div>
	);
};

export default HomePage;
