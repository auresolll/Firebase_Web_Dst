export const formatVND = (number: number) => {
	return number.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
