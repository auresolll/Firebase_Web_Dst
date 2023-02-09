let array = [1, 2, 3];

const sum = (array) => {
	let total = 0;
	array.forEach((element, index) => {
		total += element;
	});

	return total;
};

array = sum(array);
console.log(array);
