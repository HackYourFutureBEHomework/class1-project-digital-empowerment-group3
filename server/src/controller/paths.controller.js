const Path = require('../model/paths.model');

exports.findAll = (req, res) => {
	Paths.find()
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
	const newPath = new Path(req.body);
	newPath
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.destroy = (req, res) => {
	Path.findOneAndDelete({ _id: req.params.id })
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
	const { pathTitle } = req.body;
	Path.findOneAndUpdate({ _id: req.params.id }, { pathTitle }, { new: true })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message
			});
		});
};
