import { toast } from "react-toastify";
import api from "./api";

export const saveUpdateMeasurementUnit = async<T>(object: T, method: any = "post"): Promise<any> => {
    try {
        const { data } = await api({
            url: "/measurementUnit",
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
            toast.error("Erro ao salvar a unidade de medida!");
        }
    }
}

export const getMeasurementUnits = async (page?: number, size?: number): Promise<any> => {
    try {

        let query = "";
        if((page !== undefined) && (size !== undefined)) {
            query += `?offset=${page}&limit=${size}`;
        } 

        const { data } = await api.get(`/measurementUnit${query}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar as unidades de medidas!");
        }
    }
}

export const deleteMeasurementUnit = async(id: number): Promise<any> => {
    try {
        const { data } = await api.delete(`/measurementUnit/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao deletar a unidade de medida!");
        }
    }
}

export const getMeasurementUnitById = async(id: number): Promise<any> => {
    try {
        const { data } = await api.get(`/measurementUnit/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Erro ao buscar a unidade de medida!");
        }
    }
}