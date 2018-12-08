import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Paths from './components/PathsHome';
import Modules from './components/Modules';
import Login from './components/Login';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class App extends Component {
	constructor() {
		super();

		const token = cookies.get('token');
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
				<Switch>
					<Route exact path="/login" render={() => <Login setLoggedInState={this.setLoggedInState} />} />
					<Route exact path="/:path(|paths|path|index)" render={() => <Paths isLoggedIn={loggedIn} />} />
					<Route path="/path/:pathId" component={Modules} />
					<Route path="/logout" render={() => this.doLogOut()} />
				</Switch>
			</Router>
		);
	}
}

export default App;