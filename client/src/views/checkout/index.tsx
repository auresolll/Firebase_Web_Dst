import { Button, Step, StepLabel, Stepper } from "@mui/material";
import * as React from "react";
import { redirect } from "react-router-dom";
import { ERROR } from "../../constants/utils";
import { displayActionMessage } from "../../helpers/utils";
import { useStore } from "../../states/context";
import OrderSummary from "./_OrderSumary";
import Payment from "./_Payment";
import Shipping from "./_Shipping";

interface ICheckOutProps {}
const steps = ["Order Summary", "Shipping Details", "Payment"];
const info = [
	"Review items in your basket.",
	"Shipping to address for you.",
	"Handle payment simple with VNPAY of VIETNAM.",
];
const CheckOut: React.FunctionComponent<ICheckOutProps> = (props) => {
	const [activeStep, setActiveStep] = React.useState(0);
	const { state } = useStore();
	const handleStep = (operator: boolean) => {
		const isEmptyInfo =
			state.order.phone === "" &&
			state.order.address === "" &&
			state.order.email === "" &&
			state.order.fullname === "";
		if (activeStep === 1 && isEmptyInfo) return;
		if (activeStep === 2) {
			displayActionMessage("The feature payment don't update", ERROR);
			return;
		}
		if (operator) {
			return setActiveStep(activeStep + 1);
		}
		if (activeStep === 0) return;
		setActiveStep(activeStep - 1);
	};
	const getContentActiveStep = (activeStep: number) => {
		switch (activeStep) {
			case 0:
				return <OrderSummary />;

			case 1:
				return <Shipping />;
			case 2:
				return <Payment />;
			default:
				break;
		}
	};
	return (
		<>
			{state.customer.uid !== "" && state.baskets.basket.length > 0 && (
				<section className="section">
					<div className="checkout-section">
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>

						<div className="checkout-container">
							<h3 className="checkout-container-title">{steps[activeStep]}</h3>
							<p className="checkout-container-desc">{info[activeStep]}</p>
							<div className="checkout-container-content">{getContentActiveStep(activeStep)}</div>
							<div className="checkout-container-btn">
								<Button type="submit" onClick={() => handleStep(false)}>
									Back
								</Button>
								<Button type="submit" onClick={() => handleStep(true)}>
									Next
								</Button>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default CheckOut;
