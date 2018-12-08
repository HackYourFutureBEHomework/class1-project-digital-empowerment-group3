const user = require('../controller/user.controller');

module.exports = (app) => {
	app.post('/register', user.find);
	app.post('/login', user.findOne);
};
