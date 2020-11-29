import api from "./api";
import { toast } from "react-toastify";

export const getQtdProductInput = async(): Promise<any> => {
	try {
		const { data } = await api.get("/productInput/monthlyQtdProductInput", {
			headers: {
				"Content-Type": "application/json"
			}
		});
		return data;
	} catch (error) {
		if(error?.response?.data?.message) {
			toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
		} else {
			toast.error("Erro ao buscar o total de quantidades de entradas de produtos.");
		}
	}
}

export const getQtdProductOutput = async(): Promise<any> => {
	try {
		const { data } = await api.get("/productOutput/monthlyQtdProductOutput", {
			headers: {
				"Content-Type": "application/json"
			}
		});
		return data;
	} catch (error) {
		if(error?.response?.data?.message) {
			toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
		} else {
			toast.error("Erro ao buscar o total de quantidades de saídas de produtos.");
		}
	}
}