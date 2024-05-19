import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
	return (
		<div className="container mx-auto flex flex-col items-center justify-center">
			<AddressElement
				options={{
					mode: "shipping",
					display: {
						name: "split",
					},
					fields: {
						phone: "always",
					},
					validation: {
						phone: {
							required: "never",
						},
					},
				}}
			/>
		</div>
	);
};

export default AddressForm;
