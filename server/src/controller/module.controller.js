const Module = require('../model/module.model');

exports.findAll = (req, res) => {
	Module.find()
		.then((modules) => {
			res.send(modules);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message
			});
		});
};

exports.create = (req, res) => {
	const newModule = new Module(req.body);
	newModule
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.destroy = (req, res) => {
	Module.findOneAndDelete({ _id: req.params.id })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message
			});
		});
};

exports.update = (req, res) => {
	const { title, title2, title3, explanation, exercise, evaluation } = req.body;
	Module.findOneAndUpdate(
		{ _id: req.params.id },
		{ title, title2, title3, explanation, exercise, evaluation },
		{ new: true }
	)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message
			});
		});
};