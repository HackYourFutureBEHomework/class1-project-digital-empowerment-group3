import React, { Component } from 'react';
import { logIn } from '../api/login';
import Cookies from 'universal-cookie';

const headers = new Headers({
	'Content-Type': 'application/json'
});

class Login extends Component {
	state = {
		email: '',
		password: ''
	};
	login = async (e) => {
		const { email, password } = this.state;
		e.preventDefault();

		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			headers,
			body: JSON.stringify({ email, password })
		});

		const { token } = await response.json();
		document.cookie = `token=${token}`;
		this.props.setLoggedInState();

		console.log(token);
	};

	setField = (e) => {
		this.setState({ [e.currentTarget.name]: e.currentTarget.value });
	};
	render() {
		const { email, password, errors } = this.state;

		return (
			<div>
				<form onSubmit={this.login}>
					<label>
						Email:
						<input type="email" value={email} name="email" onChange={this.setField} />
					</label>
					<label>
						password:
						<input type="password" value={password} name="password" onChange={this.setField} />
					</label>
					<input type="submit" value="login" />
				</form>
			</div>
		);
	}
}

export default Login;