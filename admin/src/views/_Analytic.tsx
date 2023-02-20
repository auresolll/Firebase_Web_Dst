/* eslint-disable array-callback-return */
import { Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DocumentData } from "firebase/firestore";
import * as React from "react";
import BarChartAnalytic from "../components/_BarChartAnalytic";
import { formatVND } from "../helpers/utils";
import firebaseRepositoryInstance from "../services/firebaseRepository";

interface IAnalyticProps {}

const Analytic: React.FunctionComponent<IAnalyticProps> = (props) => {
	const [overviewsTotal, setOverViewsTotal] = React.useState({
		earn: 0,
		seller: 0,
		customers: 0,
	});

	const [dataChart, setDateChart] = React.useState<DocumentData[]>([]);
	const [valueFrom, setValueFrom] = React.useState<Date | null>(new Date());
	const [valueTo, setValueTo] = React.useState<Date | null>(new Date());

	const handleSubmitTimer = async (from: Date | null, to: Date | null) => {
		const isNull = from === null && to === null;
		const invalidRangeTime = (from as Date) <= (to as Date);
		if (isNull === false && invalidRangeTime) {
			const dataChart = await firebaseRepositoryInstance.getEarnWithTime(from as Date, to as Date);
			setDateChart(dataChart);
		}
	};

	React.useEffect(() => {
		const fetchData = async () => {
			setOverViewsTotal({
				earn: (await firebaseRepositoryInstance.getTotalCostEarn()).count,
				seller: (await firebaseRepositoryInstance.getTotalProductsSeller()).count,
				customers: (await firebaseRepositoryInstance.getTotalCustomers()).count,
			});
			setDateChart(await firebaseRepositoryInstance.getEarnWithNowDay());
		};

		fetchData();
	}, []);
	return (
		<>
			<div>
				<div className="inner-section">
					<div className="inner-section-header">
						<h1>Hi, Welcome back</h1>
					</div>
					<div className="inner-section-analytic-count">
						<div className="inner-section-analytic-count-item">
							<p className="cost">{formatVND(overviewsTotal.earn)}</p>
							<p className="title">Total Earning</p>
							<div className="circle"></div>
							<div className="circle_2"></div>
						</div>
						<div className="inner-section-analytic-count-item">
							<p className="cost">{overviewsTotal.seller} Sellers</p>
							<p className="title">Total Food Seller</p>
							<div className="circle"></div>
							<div className="circle_2"></div>
						</div>
						<div className="inner-section-analytic-count-item">
							<p className="cost">{overviewsTotal.customers} Customers</p>
							<p className="title">Total Customer</p>
							<div className="circle"></div>
							<div className="circle_2"></div>
						</div>
					</div>
					<div className="inner-section-analytic-timer">
						<div className="inner-section-analytic-timer-from">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateTimePicker
									renderInput={(props) => <TextField {...props} />}
									label="DateTimePicker"
									value={valueFrom}
									onChange={(newValue) => {
										setValueFrom(newValue);
									}}
								/>
							</LocalizationProvider>
						</div>
						<div className="inner-section-analytic-timer-to">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateTimePicker
									renderInput={(props) => <TextField {...props} />}
									label="DateTimePicker"
									value={valueTo}
									onChange={(newValue) => {
										setValueTo(newValue);
									}}
								/>
							</LocalizationProvider>
						</div>
						<div>
							<Button variant="contained" onClick={() => handleSubmitTimer(valueFrom, valueTo)}>
								Check
							</Button>
						</div>
					</div>
					<div className="inner-section-analytic-timer-data">
						<BarChartAnalytic dataChart={dataChart} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Analytic;
