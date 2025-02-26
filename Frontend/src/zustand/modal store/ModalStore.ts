
import { create } from "zustand";


export interface ModalState {
    CreateServerModal: boolean;
    EditServerModal:boolean,
    deleteServerModal:boolean,
    CreateChannelModal:boolean,
    CreateCategoryModal:boolean,
    editModal:{
        name:string,
        open:boolean,
        type:string,
        id?:string 
    },
    ImagePreviewModal:{
        image:string,
        show:boolean
    },
    InvitePeople:boolean,
    setCreateServerModal: () => void;
    setEditServerModal: () => void;
    setDeleteServerModal: () => void;
    setImagePreviewModal: (image:string) => void;
    setInvitePeopleModal: () => void;
    setCreateChannelModal: () => void;
    setCreateCategoryModal: () => void;
    setEditModal: (name:string, type:string,id:string) => void;
}

export const useModalStore = create<ModalState>((set)=>({
    CreateServerModal:false,
    EditServerModal:false,
    deleteServerModal:false,
    CreateChannelModal:false,
    CreateCategoryModal:false,
    editModal:{
        name:"",
        open:false,
        type:"",
        id:""
    },
    ImagePreviewModal:{
        image:'',
        show:false
    },
    InvitePeople:false,
    setCreateServerModal:()=> set((state) => ({ CreateServerModal:!state.CreateServerModal })),
    setEditServerModal:()=> set((state) => ({ EditServerModal:!state.EditServerModal })),
    setDeleteServerModal:()=> set((state) => ({ deleteServerModal:!state.deleteServerModal })),
    setImagePreviewModal:(image:string)=> set((state) => ({ImagePreviewModal:{ image, show:!state.ImagePreviewModal.show }})),
    setInvitePeopleModal:()=> set((state) => ({ InvitePeople:!state.InvitePeople })),
    setCreateChannelModal:()=> set((state) => ({CreateChannelModal:!state.CreateChannelModal})),
    setCreateCategoryModal:()=> set((state) => ({CreateCategoryModal:!state.CreateCategoryModal})),
    setEditModal:(name:string, type:string, id:string)=> set((state) => ({editModal:{ name:name, id:id, type:type, open:!state.editModal.open }}))
}))
