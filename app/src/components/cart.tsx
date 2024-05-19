import React from "react";
import productImage from "../../public/can_small.jpg"; // Make sure to update the path accordingly

const Cart: React.FC = () => {
	return (
		<div className="bg-white  max-w-sm w-full border border-light-grey rounded-md p-5 my-5 shadow-lg">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-lg font-semibold">Test Company</h2>
					<p className="text-sm text-gray-500">TEST MODE</p>
				</div>
			</div>
			<div className="mt-6 flex flex-col items-center">
				<img
					src={productImage}
					alt="Product"
					className="w-32 h-32 object-contain mb-4"
				/>
				<div className="text-center">
					<h3 className="text-gray-700 font-medium">SMALL CAN</h3>
					<p className="text-gray-500">A very small white can</p>
					<p className="text-gray-900 font-semibold">$50.00 USD</p>
				</div>
			</div>
		</div>
	);
};

export default Cart;
