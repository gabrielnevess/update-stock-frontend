import { toast } from "react-toastify";
import api from "./api";

export const saveUpdateUser = async<T>(object: T, method: any = "post"): Promise<any> => {
    try {
        const { data } = await api({
            url: "/user",
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
            toast.error("Erro ao salvar o usuário!");
        }
    }
}

export const getUsers = async (page?: number, size?: number): Promise<any> => {
    try {

        let query = "";
        if((page !== undefined) && (size !== undefined)) {
            query += `?offset=${page}&limit=${size}`;
        } 

        const { data } = await api.get(`/user${query}`, {
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

export const deleteUser = async(id: number): Promise<any> => {
    try {
        const { data } = await api.delete(`/user/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao deletar o usuário!");
        }
    }
}

export const getUserById = async(id: number): Promise<any> => {
    try {
        const { data } = await api.get(`/user/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar o usuário!");
        }
    }
}