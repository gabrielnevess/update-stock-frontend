import { toast } from "react-toastify";
import api from "./api";

export const saveUpdateRole = async<T>(object: T, method: any = "post"): Promise<any> => {
    try {
        const { data } = await api({
            url: "/role",
            method: method,
            data: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else if (Array.isArray(error?.response?.data)) {
            throw (error?.response?.data);
        } else {
            toast.error("Erro ao salvar a permissão!");
        }
    }
}

export const getRoles = async (page?: number, size?: number): Promise<any> => {
    try {

        let query = "";
        if((page !== undefined) && (size !== undefined)) {
            query += `?offset=${page}&limit=${size}`;
        } 

        const { data } = await api.get(`/role${query}`, {
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

export const deleteRole = async(id: number): Promise<any> => {
    try {
        const { data } = await api.delete(`/role/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao deletar a permissão!");
        }
    }
}

export const getRoleById = async(id: number): Promise<any> => {
    try {
        const { data } = await api.get(`/role/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar a permissão!");
        }
    }
}