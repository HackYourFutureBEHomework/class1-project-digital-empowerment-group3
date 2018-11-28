import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Modules from './components/Modules';

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path=":path(modules|)" component={Modules} />
			<Route render={() => <p>Page not found</p>} />
		</Switch>
	</BrowserRouter>
);

<<<<<<< HEAD
export default App;
 
=======
export default App;
>>>>>>> 4b1beb7c937490a9b7975242cf6af0770ca3294f
