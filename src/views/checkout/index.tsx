import { Stepper, Step, StepLabel } from "@mui/material";
import * as React from "react";
import OrderSummary from "./_OrderSumary";

interface ICheckOutProps {}
const steps = ["Order Summary", "Shipping Details", "Payment"];
const info = [
	"Review items in your basket.",
	"Shipping to address for you.",
	"Handle payment simple with VNPAY of VIETNAM.",
];
const CheckOut: React.FunctionComponent<ICheckOutProps> = (props) => {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleStep = (operator: boolean) => {
		if (activeStep > 3) return;
		if (operator) {
			setActiveStep(activeStep + 1);
		}
		if (activeStep === 0) return;
		setActiveStep(activeStep - 1);
	};
	const getContentActiveStep = (activeStep: number) => {
		switch (activeStep) {
			case 0:
				return <OrderSummary />;

			default:
				break;
		}
	};
	return (
		<>
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
							<button onClick={() => handleStep(false)}>Back</button>
							<button onClick={() => handleStep(true)}>Next</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default CheckOut;
