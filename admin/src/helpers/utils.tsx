export const formatVND = (number: number) => {
	return number.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const convert = (str: string) => {
	var date = new Date(str),
		month = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
	return [date.getFullYear(), month, day].join("-");
};
