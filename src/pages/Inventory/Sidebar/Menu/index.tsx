import React from "react";

import {
    ROLE_CADASTRAR_ENTRADA_PRODUTO,
    ROLE_CADASTRAR_MARCA,
    ROLE_CADASTRAR_PRODUTO,
    ROLE_CADASTRAR_SAIDA_PRODUTO,
    ROLE_CADASTRAR_UNIDADE_MEDIDA,
    ROLE_PESQUISAR_ENTRADA_PRODUTO,
    ROLE_PESQUISAR_MARCA,
    ROLE_PESQUISAR_PRODUTO,
    ROLE_PESQUISAR_SAIDA_PRODUTO,
    ROLE_PESQUISAR_UNIDADE_MEDIDA
} from "./permissions";

import NotFound from "../../../../components/NotFound";
import HomeIcon from "@material-ui/icons/Home";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";

import ViewProductInput from "../../ProductInput";
import CreateProductInput from "../../ProductInput/CreateProductInput";

import ViewProductOutput from "../../ProductOutput";
import CreateProductOutput from "../../ProductOutput/CreateProductOutput";

import ViewBrand from "../../Brand";
import CreateEditBrand from "../../Brand/CreateEditBrand";

import ViewMeasurementUnit from "../../MeasurementUnit";
import CreateEditMeasurementUnit from "../../MeasurementUnit/CreateEditMeasurementUnit";

import ViewProduct from "../../Product";
import CreateEditProduct from "../../Product/CreateEditProduct";

// ---------- PÁGINAS ----------
export const homeInventory: string = "/inventario";
export const inventoryProductInput: string = "/inventario/entradas";
export const inventoryProductInputC: string = "/inventario/c-entradas";

export const inventoryProductOutput: string = "/inventario/saidas";
export const inventoryProductOutputC: string = "/inventario/c-saidas";

//unidades
export const inventoryMeasurementUnit: string = "/inventario/unidades";
export const inventoryMeasurementUnitCe: string = "/inventario/ce-unidades";
// marcas
export const inventoryBrand: string = "/inventario/marcas";
export const inventoryBrandCe: string = "/inventario/ce-marcas";
//produtos
export const inventoryProduct: string = "/inventario/produtos";
export const inventoryProductCe: string = "/inventario/ce-produtos";

// ---------- TÍTULOS ----------
const titleHome: string = "Início";
const titleProductInput: string = "Entradas";
const titleProductOutput: string = "Saídas";
// cadastrados
const titleRegistration: string = "Cadastros";
const titleMeasurementUnit: string = "Unidades";
const titleBrand: string = "Marcas";
const titleProduct: string = "Produtos";

export interface ILink {
    name: string;
    to: string;
    icon: () => JSX.Element;
}

export interface IRoutes {
    exact?: boolean;
    path: string;
    component: () => JSX.Element;
}

export interface ICollapse {
    name: string;
    icon: () => JSX.Element;
}

export interface ILinks {
    collapse?: ICollapse;
    sidebar: ILink[];
}

export const setUpRoutes = (permissions: string[]): IRoutes[] => {

    let routesSidebar: IRoutes[] = [];

    routesSidebar.push({
        path: homeInventory,
        exact: true,
        component: () => <div>Home</div>
    });

    if (permissions.includes(ROLE_PESQUISAR_ENTRADA_PRODUTO)) {
        routesSidebar.push({
            path: inventoryProductInput,
            exact: true,
            component: () => <ViewProductInput title="Entradas" />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_ENTRADA_PRODUTO)) {
        routesSidebar.push({
            path: inventoryProductInputC,
            exact: true,
            component: () => <CreateProductInput />
        });
    }

    if (permissions.includes(ROLE_PESQUISAR_SAIDA_PRODUTO)) {
        routesSidebar.push({
            path: inventoryProductOutput,
            exact: true,
            component: () => <ViewProductOutput title="Saídas" />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_SAIDA_PRODUTO)) {
        routesSidebar.push({
            path: inventoryProductOutputC,
            exact: true,
            component: () => <CreateProductOutput />
        });
    }

    if (permissions.includes(ROLE_PESQUISAR_MARCA)) {
        routesSidebar.push({
            path: inventoryBrand,
            exact: true,
            component: () => <ViewBrand title="Marcas" />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_MARCA)) {
        routesSidebar.push({
            path: inventoryBrandCe,
            exact: true,
            component: () => <CreateEditBrand />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_MARCA)) {
        routesSidebar.push({
            path: `${inventoryBrandCe}/:id`,
            exact: true,
            component: () => <CreateEditBrand />
        });
    }

    if (permissions.includes(ROLE_PESQUISAR_UNIDADE_MEDIDA)) {
        routesSidebar.push({
            path: inventoryMeasurementUnit,
            exact: true,
            component: () => <ViewMeasurementUnit title="Unidades de medidas" />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_UNIDADE_MEDIDA)) {
        routesSidebar.push({
            path: inventoryMeasurementUnitCe,
            exact: true,
            component: () => <CreateEditMeasurementUnit />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_UNIDADE_MEDIDA)) {
        routesSidebar.push({
            path: `${inventoryMeasurementUnitCe}/:id`,
            exact: true,
            component: () => <CreateEditMeasurementUnit />
        });
    }

    if (permissions.includes(ROLE_PESQUISAR_PRODUTO)) {
        routesSidebar.push({
            path: inventoryProduct,
            exact: true,
            component: () => <ViewProduct title="Produtos" />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_PRODUTO)) {
        routesSidebar.push({
            path: inventoryProductCe,
            exact: true,
            component: () => <CreateEditProduct />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_PRODUTO)) {
        routesSidebar.push({
            path: `${inventoryProductCe}/:id`,
            exact: true,
            component: () => <CreateEditProduct />
        });
    }

    routesSidebar.push({
        path: "*",
        component: () => <NotFound />
    });

    return routesSidebar;
};

export const setUpLinks = (permissions: string[]): ILinks[] => {
    let linksSidebar: ILinks[] = [];

    linksSidebar.push({
        sidebar: [
            {
                name: titleHome,
                to: homeInventory,
                icon: () => <HomeIcon />
            }
        ]
    });

    if(permissions.includes(ROLE_PESQUISAR_ENTRADA_PRODUTO)) {
        linksSidebar.push({
            sidebar: [
                {
                    name: titleProductInput,
                    to: inventoryProductInput,
                    icon: () => <AddShoppingCartIcon />
                }
            ]
        });
    }

    if(permissions.includes(ROLE_PESQUISAR_SAIDA_PRODUTO)) {
        linksSidebar.push({
            sidebar: [
                {
                    name: titleProductOutput,
                    to: inventoryProductOutput,
                    icon: () => <RemoveShoppingCartIcon />
                }
            ]
        });
    }

    if(permissions.includes(ROLE_PESQUISAR_UNIDADE_MEDIDA) ||
        permissions.includes(ROLE_PESQUISAR_MARCA) || 
       permissions.includes(ROLE_PESQUISAR_PRODUTO)) {

        let sidebar: ILink[] = [];

        if(permissions.includes(ROLE_PESQUISAR_UNIDADE_MEDIDA)) {
            sidebar.push({
                name: titleMeasurementUnit,
                to: inventoryMeasurementUnit,
                icon: () => <AssessmentIcon />
            });
        }

        if(permissions.includes(ROLE_PESQUISAR_MARCA)) {
            sidebar.push( {
                name: titleBrand,
                to: inventoryBrand,
                icon: () => <LocalOfferIcon />
            });
        }

        if(permissions.includes(ROLE_PESQUISAR_PRODUTO)) {
            sidebar.push({
                name: titleProduct,
                to: inventoryProduct,
                icon: () => <DevicesOtherIcon />
            });
        }

        linksSidebar.push({
            collapse: {
                name: titleRegistration,
                icon: () => <NoteAddIcon />,
            },
            sidebar: sidebar
        });        
    }

    return linksSidebar;
}