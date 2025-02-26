
import { create } from "zustand";


export interface ModalState {
    serverDetails:{
        serverId:string,
        categoryId:string
    },
    setServerDetails: (serverId:string, categoryId:string) => void;
}

export const useServerStore = create<ModalState>((set)=>({
    serverDetails:{
        serverId:'',
        categoryId:''
    },
    setServerDetails:(serverId:string, categoryId:string)=> set(() => ({serverDetails:{serverId:serverId, categoryId:categoryId}})),
}))
