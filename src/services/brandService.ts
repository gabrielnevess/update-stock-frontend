import { toast } from "react-toastify";
import api from "./api";

export const saveUpdateBrand = async<T>(object: T, method: any = "post"): Promise<any> => {
    try {
        const { data } = await api({
            url: "/brand",
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
            toast.error("Erro ao salvar a marca!");
        }
    }
}

export const getBrands = async (page: number, size: number): Promise<any> => {
    try {
        const { data } = await api.get(`/brand?offset=${page}&limit=${size}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar as marcas!");
        }
    }
}

export const getDeleteBrand = async(id: number): Promise<any> => {
    try {
        const { data } = await api.delete(`/brand/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar a marca!");
        }
    }
}

export const getBrandById = async(id: number): Promise<any> => {
    try {
        const { data } = await api.get(`/brand/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar a marca!");
        }
    }
}