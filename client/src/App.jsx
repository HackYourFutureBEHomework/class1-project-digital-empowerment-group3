import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Paths from './components/PathsHome';
import Modules from './components/Modules';
import Login from './components/Login';
class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false
		};
		const getCookie = (cookiename) => {
			const cookiestring = RegExp('' + cookiename + '[^;]+').exec(document.cookie);
			return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : '');
		};

		const token = getCookie('token');
		this.state = {
			loggedIn: !!token
		};
	}

	setLoggedInState = () => {
		this.setState({ loggedIn: true });
	};

	doLogOut = () => {
		document.cookie = null;
		this.setState({
			loggedIn: false
		});
	};
	render() {
		const { loggedIn } = this.state;
		console.log(loggedIn);
		return (
			<Router>
				{!loggedIn ? (
					<Switch>
						<Route path="/login" render={() => <Login setLoggedInState={this.setLoggedInState} />} />
						<Route path="/logout" render={() => this.doLogOut()} />
						<Redirect to="/login" />
					</Switch>
				) : (
					<Switch>
						<Route exact path="/:path(|paths|path|index)" render={() => <Paths isLoggedIn={loggedIn} />} />
						<Route path="/path/:pathId" component={Modules} />
						<Route exact path="/:path(|paths|path|index)" render={() => <Paths isLoggedIn={loggedIn} />} />
					</Switch>
				)}
			</Router>
		);
	}
}

export default App;
