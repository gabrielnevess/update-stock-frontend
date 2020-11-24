import { toast } from "react-toastify";
import api from "./api";

export const getUserRolesUsers = async (page?: number, size?: number): Promise<any> => {
    try {

        let query = "";
        if((page !== undefined) && (size !== undefined)) {
            query += `?offset=${page}&limit=${size}`;
        } 

        const { data } = await api.get(`/userRole/users${query}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar os usuários!");
        }
    }
}

export const getUserRoles = async (page?: number, size?: number): Promise<any> => {
    try {

        let query = "";
        if((page !== undefined) && (size !== undefined)) {
            query += `?offset=${page}&limit=${size}`;
        } 

        const { data } = await api.get(`/userRole${query}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar os usuários permissões!");
        }
    }
}

export const getRolesByUserId = async(id: number): Promise<any> => {
    try {
        const { data } = await api.get(`/userRole/findRolesByUserId/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar o permissões do usuário!");
        }
    }
}

export const getRoles = async (): Promise<any> => {
    try {
        const { data } = await api.get("/userRole/roles", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar as permissões!");
        }
    }
}
