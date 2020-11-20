import React from 'react';
import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps,
    Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const { logged } = useAuth();

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) =>
                !logged?.isLogged ? (
                    children
                ) : (
                        <Redirect to={{
                            pathname: "/inventario",
                            state: { from: location }
                        }} />
                    )
            }
        />
    );
};

export default PublicRoute;