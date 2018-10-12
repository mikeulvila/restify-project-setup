module.exports = (req, res, next) => {
	const token = req.header('x-auth');
	console.log('TOKEN FROM HEADER *** => ', token);
	next();
};
