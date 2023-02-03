/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useForm } from "react-hook-form";
import { ActionType } from "../../states/actions";
import { useStore } from "../../states/context";

interface IShippingProps {}

const Shipping: React.FunctionComponent<IShippingProps> = (props) => {
	const { state, dispatch } = useStore();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data: any) => console.log(data);
	const handleDispatchOrder = (name: string, value: string) => {
		dispatch({
			type: ActionType.AddInfoOrder,
			payload: {
				name: name,
				value: value,
			},
		});
	};
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
									onChange={(e) => {
										handleDispatchOrder("fullname", e.target.value);
									}}
									{...(register("fullname"), { required: true })}
								/>
								{errors.fullname && <span>This field is required</span>}
							</div>
							<div className="shipping-checkout-form-field">
								<label>* Email</label>
								<input
									type="email"
									onChange={(e) => {
										handleDispatchOrder("fullname", e.target.value);
									}}
									{...(register("email"), { required: true })}
								/>
								{errors.email && <span>This field is required</span>}
							</div>
							<div className="shipping-checkout-form-field">
								<label>* Shipping Address</label>
								<input
									type="text"
									{...(register("address"), { required: true })}
									onChange={(e) => {
										handleDispatchOrder("address", e.target.value);
									}}
								/>

								{errors.address && <span>This field is required</span>}
							</div>
							<div className="shipping-checkout-form-field">
								<label>* Mobile Number</label>
								<input
									type="text"
									{...(register("phone"), { required: true })}
									onChange={(e) => {
										handleDispatchOrder("phone", e.target.value);
									}}
								/>

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
