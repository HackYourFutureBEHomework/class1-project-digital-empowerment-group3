const jwt = require('jsonwebtoken');
const paths = require('../controller/path.controller');
const modules = require('../controller/module.controller');
const { JWT_SECRET } = process.env;

// const verifyToken = (req, res, next) => {
// 	let token = req.headers['x-access-token'];

// 	if (token) {
// 		jwt.verify(token, JWT_SECRET, (err, decoded) => {
// 			if (err) {
// 				return res.json({ message: 'invalid token' });
// 			} else {
// 				req.decoded = decoded;
// 				next();
// 			}
// 		});
// 	} else {
// 		res.send({
// 			message: 'No token provided.'
// 		});
// 	}
// };

// const verifyToken = (req, res, next) => {
// 	const bearerHeader = req.headers['authorization'];
// 	if (typeof bearerHeader !== 'undefined') {
// 		const bearer = bearerHeader.split(' ');
// 		const bearerToken = bearer[1];
// 		req.token = bearerToken;
// 		next();
// 	} else {
// 		res.sendStatus(403);
// 	}
// };

module.exports = (app) => {
	app.get('/path', paths.findAll);
	app.get('/path/:pathId', paths.findOne);
	app.post('/path', paths.create);
	app.post('/path/:pathId/module', modules.create);
	app.patch('/path/:id', paths.update);
	app.delete('/path/:id', paths.destroy);
};