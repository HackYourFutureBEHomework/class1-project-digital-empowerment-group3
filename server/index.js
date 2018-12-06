const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
	.then(() => {
		console.log('Database connection established');
	})
	.catch((err) => {
		console.error(`Database error, exiting. Stack trace:\n${err}`);
		process.exit();
	});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json({ message: 'API ready' });
});

require('./src/route/module.route')(app);
require('./src/route/path.route')(app);
require('./src/route/user.route')(app);

// const userEmail = 'eduardohralejandro@gmail.com';
// const userPassword = '123';
// const { JWT_SECRET } = process.env;
// app.post('/api/login', async (req, res) => {
// 	const { email, password } = req.body;
// 	if (email === userEmail && password === userPassword) {
// 		const payload = { email };
// 		const token = jwt.sign(payload, JWT_SECRET);

// 		res.send({ token, email });
// 	} else {
// 		res.status(403).send({ message: 'incorrect email or password' });
// 	}
// 	// const user = await User.findOne({ email });
// });
const port = process.env.MONGODB_URI || 4000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
