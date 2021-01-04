import React from "react";
import { Route, Redirect } from "react-router-dom";
// import auth from "./auth";

const ProtectedRoute = ({
	component: Component,
	...rest
}) => (
	<Route
		{...rest}
		render={props => {
			// if (auth.isAuthenticated()) {
			if (localStorage.getItem('user')) {
				return <Component {...props} />;
			} else {
				return (
					<Redirect
						to={{
							pathname: "/login",
							state: {
								from: props.location
							}
						}}
					/>
				);
			}
		}}
	/>
);

export default ProtectedRoute;