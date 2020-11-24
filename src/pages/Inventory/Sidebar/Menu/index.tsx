import React from "react";

import {
    ROLE_CADASTRAR_ENTRADA_PRODUTO,
    ROLE_CADASTRAR_MARCA,
    ROLE_CADASTRAR_PERMISSAO,
    ROLE_CADASTRAR_PRODUTO,
    ROLE_CADASTRAR_SAIDA_PRODUTO,
    ROLE_CADASTRAR_UNIDADE_MEDIDA,
    ROLE_CADASTRAR_USUARIO,
    ROLE_CADASTRAR_USUARIO_PERMISSAO,
    ROLE_PESQUISAR_ENTRADA_PRODUTO,
    ROLE_PESQUISAR_ESTOQUE,
    ROLE_PESQUISAR_MARCA,
    ROLE_PESQUISAR_PERMISSAO,
    ROLE_PESQUISAR_PRODUTO,
    ROLE_PESQUISAR_SAIDA_PRODUTO,
    ROLE_PESQUISAR_UNIDADE_MEDIDA,
    ROLE_PESQUISAR_USUARIO,
    ROLE_PESQUISAR_USUARIO_PERMISSAO
} from "./permissions";

import NotFound from "../../../../components/NotFound";
import HomeIcon from "@material-ui/icons/Home";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
import SecurityIcon from "@material-ui/icons/Security";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import ViewStock from "../../Stock";

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

import ViewRole from "../../Role";
import CreateEditRole from "../../Role/CreateEditRole";

import ViewUser from "../../User";
import CreateEditUser from "../../User/CreateEditUser";

import ViewUserRole from "../../UserRole";
import CreateEditUserRole from "../../UserRole/CreateEditUserRoles";

// ---------- PÁGINAS ----------
export const homeInventory: string = "/inventario";
//estoque
export const inventoryStockActual: string = "/inventario/estoque-atual";
//entradas
export const inventoryProductInput: string = "/inventario/entradas";
export const inventoryProductInputC: string = "/inventario/c-entradas";
//saidas
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
//permissões
export const inventoryRole: string = "/inventario/permissoes";
export const inventoryRoleCe: string = "/inventario/ce-permissoes";
//usuários
export const inventoryUser: string = "/inventario/usuarios";
export const inventoryUserCe: string = "/inventario/ce-usuarios";
// usuário / permissões
export const inventoryUserRole: string = "/inventario/usuarios-permissoes";
export const inventoryUserRoleCe: string = "/inventario/ce-usuarios-permissoes"; 

// ---------- TÍTULOS ----------
const titleHome: string = "Início";
const titleStockActual: string = "Estoque Atual";
const titleProductInput: string = "Entradas";
const titleProductOutput: string = "Saídas";
// cadastrados
const titleRegistration: string = "Cadastros";
const titleMeasurementUnit: string = "Unidades";
const titleBrand: string = "Marcas";
const titleProduct: string = "Produtos";

// configurações
const titleAccess: string = "Acesso";
const titleUserRole: string = "Usuários/Permissões";
const titleUser: string = "Usuários"
const titleRole: string = "Permissões";

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

    if(permissions.includes(ROLE_PESQUISAR_ESTOQUE)) {
        linksSidebar.push({
            sidebar: [
                {
                    name: titleStockActual,
                    to: inventoryStockActual,
                    icon: () => <ShoppingCartIcon />
                }
            ]
        });
    }

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

    if(permissions.includes(ROLE_PESQUISAR_PERMISSAO) ||
       permissions.includes(ROLE_PESQUISAR_USUARIO) ||
       permissions.includes(ROLE_PESQUISAR_USUARIO_PERMISSAO)) {

        let sidebar: ILink[] = [];

        if(permissions.includes(ROLE_PESQUISAR_PERMISSAO)) {
            sidebar.push({
                name: titleRole,
                to: inventoryRole,
                icon: () => <SecurityIcon />
            });
        }


        if(permissions.includes(ROLE_PESQUISAR_USUARIO)) {
            sidebar.push({
                name: titleUser,
                to: inventoryUser,
                icon: () => <PersonIcon />
            });
        }

        if(permissions.includes(ROLE_PESQUISAR_USUARIO) &&
           permissions.includes(ROLE_PESQUISAR_USUARIO_PERMISSAO)) {
            sidebar.push({
                name: titleUserRole,
                to: inventoryUserRole,
                icon: () => <PersonAddIcon />
            });
        }

        linksSidebar.push({
            collapse: {
                name: titleAccess,
                icon: () => <SupervisorAccountIcon />,
            },
            sidebar: sidebar
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

export const setUpRoutes = (permissions: string[]): IRoutes[] => {

    let routesSidebar: IRoutes[] = [];

    routesSidebar.push({
        path: homeInventory,
        exact: true,
        component: () => <div>Home</div>
    });

    if(permissions.includes(ROLE_PESQUISAR_ESTOQUE)) {
        routesSidebar.push({
            path: inventoryStockActual,
            exact: true,
            component: () => <ViewStock title={titleStockActual} />
        });
    }

    if (permissions.includes(ROLE_PESQUISAR_ENTRADA_PRODUTO)) {
        routesSidebar.push({
            path: inventoryProductInput,
            exact: true,
            component: () => <ViewProductInput title={titleProductInput} />
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
            component: () => <ViewProductOutput title={titleProductOutput} />
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
            component: () => <ViewBrand title={titleBrand} />
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
            component: () => <ViewMeasurementUnit title={titleMeasurementUnit} />
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
            component: () => <ViewProduct title={titleProduct} />
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

    if (permissions.includes(ROLE_PESQUISAR_PERMISSAO)) {
        routesSidebar.push({
            path: inventoryRole,
            exact: true,
            component: () => <ViewRole title={titleRole} />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_PERMISSAO)) {
        routesSidebar.push({
            path: inventoryRoleCe,
            exact: true,
            component: () => <CreateEditRole />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_PERMISSAO)) {
        routesSidebar.push({
            path: `${inventoryRoleCe}/:id`,
            exact: true,
            component: () => <CreateEditRole />
        });
    }

    if (permissions.includes(ROLE_PESQUISAR_USUARIO)) {
        routesSidebar.push({
            path: inventoryUser,
            exact: true,
            component: () => <ViewUser title={titleUser} />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_USUARIO)) {
        routesSidebar.push({
            path: inventoryUserCe,
            exact: true,
            component: () => <CreateEditUser />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_USUARIO)) {
        routesSidebar.push({
            path: `${inventoryUserCe}/:id`,
            exact: true,
            component: () => <CreateEditUser />
        });
    }

    if (permissions.includes(ROLE_PESQUISAR_USUARIO_PERMISSAO)) {
        routesSidebar.push({
            path: inventoryUserRole,
            exact: true,
            component: () => <ViewUserRole title={titleUserRole} />
        });
    }

    if (permissions.includes(ROLE_CADASTRAR_USUARIO_PERMISSAO) &&
        permissions.includes(ROLE_PESQUISAR_USUARIO) &&
        permissions.includes(ROLE_PESQUISAR_PERMISSAO)) {
        routesSidebar.push({
            path: `${inventoryUserRoleCe}/:id`,
            exact: true,
            component: () => <CreateEditUserRole />
        });
    }

    routesSidebar.push({
        path: "*",
        component: () => <NotFound />
    });

    return routesSidebar;
};