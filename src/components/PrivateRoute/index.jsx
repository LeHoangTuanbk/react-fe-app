import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, isAdmin, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAdmin ?
                <Component {...props} {...rest} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;