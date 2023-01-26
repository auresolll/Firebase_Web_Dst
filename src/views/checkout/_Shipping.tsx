import * as React from "react";
import { useForm } from "react-hook-form";
import { useStore } from "../../states/context";

interface IShippingProps {}

const Shipping: React.FunctionComponent<IShippingProps> = (props) => {
	const { state } = useStore();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = (data: any) => console.log(data);
	return (
		<>
			{state.customer.uid !== "" && (
				<section className="section">
					<div className="shipping-checkout-section">
						<form className="shipping-checkout-form" onSubmit={handleSubmit(onSubmit)}>
							<div className="shipping-checkout-form-field">
								<label>* Full name</label>
								<input
									type="text"
									value={
										state.customer.displayName
											? `${state.customer.displayName}`
											: `${state.customer.email}`
									}
									{...(register("fullname"), { required: true })}
								/>
								{errors.fullname && <span>This field is required</span>}
							</div>
							<div className="shipping-checkout-form-field">
								<label>* Email</label>
								<input
									type="email"
									value={state.customer.email ? `${state.customer.email}` : ""}
									{...(register("email"), { required: true })}
								/>
								{errors.email && <span>This field is required</span>}
							</div>
							<div className="shipping-checkout-form-field">
								<label>* Shipping Address</label>
								<input type="text" {...(register("address"), { required: true })} />
								{errors.address && <span>This field is required</span>}
							</div>
							<div className="shipping-checkout-form-field">
								<label>* Mobile Number</label>
								<input type="text" {...(register("phone"), { required: true })} />
								{errors.phone && <span>This field is required</span>}
							</div>
						</form>
					</div>
				</section>
			)}
		</>
	);
};

export default Shipping;
