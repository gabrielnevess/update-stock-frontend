import { toast } from "react-toastify";
import api from "./api";

export const saveUpdateProduct = async<T>(object: T, method: any = "post"): Promise<any> => {
    try {
        const { data } = await api({
            url: "/product",
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
            toast.error("Erro ao salvar o produto!");
        }
    }
}

export const getProducts = async (page?: number, size?: number): Promise<any> => {
    try {

        let query = "";
        if((page !== undefined) && (size !== undefined)) {
            query += `?offset=${page}&limit=${size}`;
        } 

        const { data } = await api.get(`/product${query}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        console.log("error: ", error);
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar os produtos!");
        }
    }
}

export const getDeleteProduct = async(id: number): Promise<any> => {
    try {
        const { data } = await api.delete(`/product/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar o produto!");
        }
    }
}

export const getProductById = async(id: number): Promise<any> => {
    try {
        const { data } = await api.get(`/product/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar o produto!");
        }
    }
}