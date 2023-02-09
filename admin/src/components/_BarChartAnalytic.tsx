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

interface IBarChartAnalyticProps {
	dataChart: DocumentData[];
}

const BarChartAnalytic: React.FunctionComponent<IBarChartAnalyticProps> = (props) => {
	const { dataChart } = props;

	return (
		<>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={500}
					height={300}
					data={dataChart}
					desc={"timestamp"}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</>
	);
};

export default BarChartAnalytic;
