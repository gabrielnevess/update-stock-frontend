import React, { createContext, useCallback, useState, useContext } from "react";
import { UserLoginDto } from "../dto/UserLoginDto";
import * as jwt from "jsonwebtoken";
import { TokenDto } from "../dto/TokenDto";
import api from "../services/api";
import { login } from "../services/authService";

interface Logged {
    name: string;
    roles: string[];
    isLogged: boolean;
}

interface AuthState {
    token: string;
    logged: Logged;
}

interface AuthContextData {
    logged: Logged;
    signIn(credentials: UserLoginDto): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem("@UpdateStock:token");

        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;

            const tokenDecoded = jwt.decode(token);
            return {
                token: token,
                logged: {
                    name: (tokenDecoded as Logged)?.name,
                    roles: (tokenDecoded as Logged)?.roles,
                    isLogged: tokenDecoded ? true : false
                }
            }
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async (userLoginDto: UserLoginDto) => {
        const resp: TokenDto = await login<UserLoginDto>(userLoginDto);

        if (resp?.token) {
            localStorage.setItem("@UpdateStock:token", resp?.token);
            api.defaults.headers.authorization = `Bearer ${resp?.token}`;

            const tokenDecoded = jwt.decode(resp?.token);
            setData({
                token: resp?.token,
                logged: {
                    name: (tokenDecoded as Logged)?.name,
                    roles: (tokenDecoded as Logged)?.roles,
                    isLogged: tokenDecoded ? true : false
                }
            });
        }

    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@UpdateStock:token");

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{ logged: data.logged, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export { AuthProvider, useAuth };