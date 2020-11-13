import React from "react";
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import Sidebar from "../pages/Inventory/Sidebar";
import { linksAdmin, routesAdmin } from "../pages/Inventory/Sidebar/RoutesAdmin";

const Routes: React.FC = () => {
    return (
        <Switch>
            
            <Route path="/inventario">
                <Sidebar
                    links={linksAdmin}
                    routes={routesAdmin}
                />
            </Route>

            <Route path="*">
                <Redirect to="/inventario" />
            </Route>

        </Switch>
    )
}

export default Routes;