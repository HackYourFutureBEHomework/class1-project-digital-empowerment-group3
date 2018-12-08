import React ,{component }  from 'react';
import {login } from '../api/login';                 
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';

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
	};

	setField = (e) => {
		this.setState({ [e.currentTarget.name]: e.currentTarget.value });
	};
	render() {
		const { email, password, isLoading } = this.state;

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
