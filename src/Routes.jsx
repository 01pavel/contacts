import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './components/Home/HomePage';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';

const Routes = () => (
	<Router>
		<Switch>
			<Route
				exact
				path="/login"
				component={Login}
			/>
			{/* <LoginPage /> */}
			<ProtectedRoute
				exact
				path="/"
				component={HomePage}
			/>
			<Route
				path="*"
				component={NotFound}
			/>
		</Switch>
	</Router>
);

export default Routes;