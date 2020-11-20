import React from "react";
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Sidebar from "../pages/Inventory/Sidebar";
import Login from "../pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";

const Routes: React.FC = () => {
    return (
        <Switch>

            <PublicRoute path="/entrar">
                <Login />
            </PublicRoute>

            <PrivateRoute path="/inventario">
                <Sidebar />
            </PrivateRoute>

            <Route path="*">
                <Redirect to="/entrar" />
            </Route>

        </Switch>
    )
}

export default Routes;