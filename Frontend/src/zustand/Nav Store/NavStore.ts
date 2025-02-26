
import { create } from "zustand";

export interface navState {
    Navigation: boolean;
    setNavigation: () => void;
}

export const useNavStore = create<navState>((set)=>({
    Navigation:true,
    setNavigation:()=> set((state) => ({ Navigation:!state.Navigation })),
}))