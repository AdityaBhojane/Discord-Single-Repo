import { create } from "zustand";
import Cookies from "js-cookie";

export interface AuthState {
    user: string | null;
    token: string | null;
    setToken: (newToken: string) => void;
    setUser: (newUser: string) => void;
    setClearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: Cookies.get('user') || null,
    token: Cookies.get('token') || null,
    setToken: (newToken: string) => {
        Cookies.set('token', newToken,{expires:3});
        set({ token: newToken });
    },
    setUser: (newUser: string) => {
        Cookies.set('user', newUser,{expires:3});
        set({ user: newUser });
    },
    setClearAuth:()=>{
        Cookies.remove('token');
        Cookies.remove('user');
    }
}));
