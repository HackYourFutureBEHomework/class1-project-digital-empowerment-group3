const paths = require('../controller/paths.controller.js');

module.exports = (app) => {
	app.get('/paths', paths.findAll);
	app.post('/paths', paths.create);
	app.delete('/path/:id', paths.destroy);
	app.patch('/path/:id', paths.update);
};
