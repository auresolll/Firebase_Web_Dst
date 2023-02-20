import { DocumentData } from "firebase/firestore";
import React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { convert } from "../helpers/utils";

interface IBarChartAnalyticProps {
	dataChart: DocumentData[];
}

const BarChartAnalytic: React.FunctionComponent<IBarChartAnalyticProps> = (props) => {
	const { dataChart } = props;
	const [filterChart, setFilterChart] = React.useState<{ date: any; count: any }[]>([]);
	React.useEffect(() => {
		let isChecked = true;
		if (isChecked && dataChart.length > 0) {
			const initDataTime = new Map();
			dataChart
				.map((el) => {
					el.timestamp = convert(el.timestamp.toDate());
					initDataTime.set(el.timestamp, {
						date: el.timestamp,
						count: 0,
					});
					return el;
				})
				.reduce((a, b) => {
					const instant_pre = initDataTime.get(a.timestamp);
					const instant_next = initDataTime.get(b.timestamp);
					if (a.timestamp === b.timestamp) {
						return (instant_pre.count += Number(a.quantity) + Number(b.quantity));
					}
					instant_pre.count = Number(a.quantity);
					return (instant_next.count = Number(b.quantity));
				});

			if (initDataTime.size > 0) {
				{
				}
				const result: ((prevState: never[]) => never[]) | { date: any; count: any }[] = [];
				initDataTime.forEach((el) => {
					result.push({
						date: el.date,
						count: el.count,
					});
				});

				setFilterChart(result);
			}
		}

		return () => {
			isChecked = false;
		};
	}, [dataChart]);
	return (
		<>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={500}
					height={300}
					data={filterChart}
					desc={"date"}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</>
	);
};

export default BarChartAnalytic;
