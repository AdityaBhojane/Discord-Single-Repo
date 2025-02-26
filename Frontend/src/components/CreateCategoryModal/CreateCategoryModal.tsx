import { useModalStore } from "../../zustand/modal store/ModalStore";
import {
    Modal,
    ModalContent,
    ModalFooter,
  } from "@nextui-org/react";
import { useServerStore } from "../../zustand/sever store/serverStore";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useCreateCategory } from "../../Hooks/apis/category/useCreateCategory";

export default function CreateCategoryModal() {
    const [text, setText] = useState('')
    const setCreateCategoryModal = useModalStore(state => state.setCreateCategoryModal);
    const CreateCategoryModal = useModalStore(state => state.CreateCategoryModal);
    const serverDetails = useServerStore(state => state.serverDetails)

    const QueryClient = useQueryClient()

    const {createCategory, isSuccess} = useCreateCategory();

    const handleCreateCategory = useCallback(()=>{
        if(!text) return;
        createCategory({name:text,id:serverDetails.serverId})
    },[createCategory, serverDetails.serverId, text]);

    useEffect(()=>{
        if(isSuccess){
            QueryClient.invalidateQueries({queryKey:["fetchServersById"]});
        }
    },[QueryClient, isSuccess])

    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={CreateCategoryModal}
                onOpenChange={()=>setCreateCategoryModal()}
            >
                <ModalContent className="bg-[#313338]">
                    {(onClose) => (
                        <>                  
                            <ModalFooter className="flex flex-col justify-center  bg-[#2B2D31] h-22 text-[#ccc]">
                                <h3 className="text-xl text-[#b3b3b3]">Create Category</h3>
                                <label htmlFor="category" className=" text-sm pt-4 ">CATEGORY NAME</label>
                                <input 
                                value={text}
                                onChange={(e)=>setText(e.target.value)}
                                className="mb-3 py-2 bg-[#161616] border border-[#464646] px-2" 
                                id="category" 
                                type="text" />
                                    <button
                                        color="primary"
                                        className="text-white bg-[#4e6ada] w-full py-1 rounded-xl"
                                        onClick={()=>{
                                            handleCreateCategory();
                                            onClose()
                                        }}
                                    >
                                        Create Category
                                    </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
