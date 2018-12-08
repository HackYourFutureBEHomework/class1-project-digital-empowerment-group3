import React, {Component } from 'react';
import { BrowserRouter as Route, Switch ,Redirect} from 'react-router-dom';
import Paths from './components/PathsHome ';
import Modules from './components/Modules';
import Login from './components/Login';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class App extends Component {
	constructor() {
		super();
    
    const token = cookies.get('token');
    this.state={
      loggedIn:!!token
    };
  }
  setLoggedInState = () => {
  this.setState({ loggedIn:true });
  };

render() {
  const { loggedIn } = this.state;
		console.log(loggedIn);
		return (
			<Router>
				<Switch>
					<Route exact path="/login" render={() => <Login setLoggedInState={this.setLoggedInState} />} />
					<Route exact path="/:path(|paths|path|index)" render={() => <Paths IsloggedIn={loggedIn} />} />
					<Route
						exact
						path="/path/:pathId"
						render={(props) => <Modules {...props} IsloggedIn={loggedIn} />}
					/>
				</Switch>
			</Router>
		);
	}
}
export default App;

  
