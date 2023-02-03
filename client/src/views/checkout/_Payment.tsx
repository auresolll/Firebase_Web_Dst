import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import * as React from "react";

interface IPaymentProps {}

const Payment: React.FunctionComponent<IPaymentProps> = (props) => {
	return (
		<>
			<section className="section">
				<div className="payment-checkout-section">
					<FormControl>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="female"
							name="radio-buttons-group"
						>
							<div className="payment-checkout-field">
								<FormControlLabel
									sx={{ width: "100%" }}
									value="Payment visa card"
									control={<Radio />}
									label="Payment visa card"
								/>
							</div>
							<div className="payment-checkout-field">
								<FormControlLabel
									value="Payment napas card"
									control={<Radio />}
									label="Payment napas card"
								/>
							</div>
							<div className="payment-checkout-field">
								<FormControlLabel value="Payment QR" control={<Radio />} label="Payment QR" />
							</div>
						</RadioGroup>
					</FormControl>
					<form className="payment-checkout-form"></form>
				</div>
			</section>
		</>
	);
};

export default Payment;
