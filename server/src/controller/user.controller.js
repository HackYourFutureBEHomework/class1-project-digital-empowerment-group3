const User = require('../model/user.model');
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.find = (req, res) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: 'This email already exists' });
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200',
				r: 'pg',
				d: 'https://example.com/images/avatar.jpg'
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save().then((user) => res.json(user)).catch((err) => console.log(err));
				});
			});
		}
	});
};

exports.findOne = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(404).json({ email: 'User not found' });
		}

		bcrypt.compare(password, user.password).then((passwordMatched) => {
			if (passwordMatched) {
				const payload = { email };
				jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
					res.json({
						Success: true,
						token: token,
						email
					});
				});
			} else {
				return res.status(400).json({ password: 'password incorrect' });
			}
		});
	});
};
