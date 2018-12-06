const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).lenght === 0) ||
		(typeof value === 'string' && value.trim(value).lenght === 0)
	);
};

module.exports = isEmpty;
