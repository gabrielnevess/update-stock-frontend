import React from "react";

import { ILinks, IRoutes } from ".";
import NotFound from "../../../components/NotFound";
import HomeIcon from "@material-ui/icons/Home";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";

import ViewBrand from "../Brand";
import CreateEditBrand from "../Brand/CreateEditBrand";

import ViewMeasurementUnit from "../MeasurementUnit";
import CreateEditMeasurementUnit from "../MeasurementUnit/CreateEditMeasurementUnit";

import ViewProduct from "../Product";

// ---------- PÁGINAS ----------
export const homeInventory: string = "/inventario";
export const inventoryProductInput: string = "/inventario/entradas";
export const inventoryProductOutput: string = "/inventario/saidas";
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

export const linksAdmin: ILinks[] = [
    {
        sidebar: [
            {
                name: titleHome,
                to: homeInventory,
                icon: () => <HomeIcon />
            }
        ]
    },
    {
        sidebar: [
            {
                name: titleProductInput,
                to: inventoryProductInput,
                icon: () => <AddShoppingCartIcon />
            }
        ]
    },
    {
        sidebar: [
            {
                name: titleProductOutput,
                to: inventoryProductOutput,
                icon: () => <RemoveShoppingCartIcon />
            }
        ]
    },
    {
        collapse: {
            name: titleRegistration,
            icon: () => <NoteAddIcon />
        },
        sidebar: [
            {
                name: titleMeasurementUnit,
                to: inventoryMeasurementUnit,
                icon: () => <AssessmentIcon />
            },
            {
                name: titleBrand,
                to: inventoryBrand,
                icon: () => <LocalOfferIcon />
            },
            {
                name: titleProduct,
                to: inventoryProduct,
                icon: () => <DevicesOtherIcon />
            }
        ]
    }
];

export const routesAdmin: IRoutes[] = [
    {
        path: homeInventory,
        exact: true,
        component: () => <div>Home</div>
    },
    {
        path: inventoryBrand,
        exact: true,
        component: () => <ViewBrand title="Marcas" />
    },
    {
        path: inventoryBrandCe,
        exact: true,
        component: () => <CreateEditBrand />
    },
    {
        path: `${inventoryBrandCe}/:id`,
        exact: true,
        component: () => <CreateEditBrand />
    },
    {
        path: inventoryMeasurementUnit,
        exact: true,
        component: () => <ViewMeasurementUnit title="Unidades" />
    },
    {
        path: inventoryMeasurementUnitCe,
        exact: true,
        component: () => <CreateEditMeasurementUnit />
    },
    {
        path: `${inventoryMeasurementUnitCe}/:id`,
        exact: true,
        component: () => <CreateEditMeasurementUnit />
    },
    {
        path: inventoryProduct,
        exact: true,
        component: () => <ViewProduct title="Produtos" />
    },
    {
        path: "*",
        component: () => <NotFound />
    }
];