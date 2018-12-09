import React, { Component } from 'react';
import { logIn } from '../api/login';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router';
import '../css/signin.css';

const cookies = new Cookies();

class Login extends Component {
	state = {
		isLoading: true,
		email: '',
		password: '',
		error: ''
	};

	login = (e) => {
		const { email, password } = this.state;
		const { history } = this.props;

		e.preventDefault();
		logIn(email, password).then((res) => {
			if (!res.token) return this.setState({ error: res.error });
			cookies.set('token', res.token);
			return this.props.setLoggedInState();
		});

		history.push('/');
	};

	setField = (e) => {
		this.setState({ [e.currentTarget.name]: e.currentTarget.value });
	};
	render() {
		const { email, password } = this.state;

		return (
			<div>
				<form className="form-login" onSubmit={this.login}>
					<label>
						Email:
						<input
							className=".form__input"
							type="email"
							value={email}
							name="email"
							onChange={this.setField}
						/>
					</label>
					<label>
						password:
						<input
							className=".form__input"
							type="password"
							value={password}
							name="password"
							onChange={this.setField}
						/>
					</label>
					<input className=".form__button" type="submit" value="login" />
				</form>
			</div>
		);
	}
}

export default withRouter(Login);
