const Path = require('../model/path.model');
const Module = require('../model/module.model');
const jwt = require('jsonwebtoken');
exports.findAll = (req, res) => {
	Path.find()
		.then((modules) => {
			res.send(modules);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message
			});
		});
};

exports.findOne = (req, res) => {
	Path.findById(req.params.pathId)
		.populate('modules')
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

const { JWT_SECRET } = process.env;
exports.update = (req, res) => {
	const { token } = req.body;

	if (err) return res.send({ message: 'token invalid' });

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

exports.addModuleToPath = async (pathId, moduleId) => {
	const learningPath = await Path.findById(pathId);
	learningPath.modules.push(moduleId);
	await learningPath.save();
	return Path.findOneAndUpdate({ _id: pathId }, learningPath, { new: true });
};
