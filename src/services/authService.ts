
import api from "./api";
import { toast } from "react-toastify";

// login no sistema
export const login = async<T>(object: T): Promise<any> => {
    try {
        const { data } = await api.post("/login", JSON.stringify(object), {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else {
            toast.error("Usuário e/ou senha incorretos!");
        }
    }
}

export const forgotPassword = async<T>(object: T): Promise<any> => {
    try {
        await api.post("/forgotPassword", JSON.stringify(object), {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return true;
    } catch (error) {
        if (Array.isArray(error?.response?.data)) {
            throw (error?.response?.data);
        } else {
            if (error?.response?.data?.message) {
                toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
            } else {
                toast.error("Erro ao enviar e-mail para redefinição de senha!");
            }
        }
    }
}

export const passwordReset = async<T>(object: T): Promise<any> => {
    try {
        await api.post("/passwordReset", JSON.stringify(object), {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return true;
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(`Ocorreu um erro: ${error?.response?.data?.message}`);
        } else if (Array.isArray(error?.response?.data)) {
            throw (error?.response?.data);
        } else {
            toast.error("Erro ao criar uma nova senha!");
        }
    }
}