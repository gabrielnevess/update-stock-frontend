
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