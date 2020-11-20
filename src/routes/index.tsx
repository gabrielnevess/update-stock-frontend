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
import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../hooks/auth";
import api from "../services/api";

const Routes: React.FC = () => {
    const { signOut } = useAuth();

    api.interceptors.response.use(function (response: AxiosResponse<any>) {
        return response;
    }, function (error: AxiosError<any>) {
        if (error?.response?.status === 401) {
            signOut();
        } else {
            return Promise.reject(error);
        }
    });

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