import { Hash } from "lucide-react";
import { useModalStore } from "../../zustand/modal store/ModalStore";
import { Modal, ModalContent, ModalFooter } from "@nextui-org/react";
import { useUpdateServer } from "../../Hooks/apis/server/useUpdateServer";
import { useUpdateChannel } from "../../Hooks/apis/channel/useUpdateChannel";
import { useUpdateCategory } from "../../Hooks/apis/category/useUpdateCategory";
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteCategory } from "../../Hooks/apis/category/useDeleteCategory";
import { useDeleteChannel } from "../../Hooks/apis/channel/useDeleteChannel";
import { useEffect, useState } from "react";

export default function EditModal() {
    const setEditModal = useModalStore(state => state.setEditModal);
    const editModal = useModalStore(state => state.editModal);
    const type = useModalStore(state => state.editModal.type);
    const [name, setName] = useState('');
    const queryClient = useQueryClient()

    const {updateServer, isSuccess} = useUpdateServer();
    const {updateChannelRequest, isSuccess:channelUpdated} = useUpdateChannel();
    const {updateCategoryRequest, isSuccess:categoryUpdated} = useUpdateCategory();
    const {deleteCategoryRequest, isSuccess:deleteCategorySuccess} = useDeleteCategory();
    const {deleteChannel, isSuccess:deleteChannelSuccess} = useDeleteChannel();
    // const {, isSuccess:categoryUpdated} = useCream();

    const handleUpdate = ()=>{
        if(!name){
            return;
        }
        if(type === 'server') {
            const id = editModal.id?? ""
            updateServer({name, serverId:id})
        }
        if(type === 'channel') {
            const id = editModal.id?? ""
            updateChannelRequest({name:name,channelId:id});
        }
        if(type == 'category'){
            const id = editModal.id?? ""
            updateCategoryRequest({name, categoryId:id})
        }
    };

    const handleDelete = ()=>{
        if(type == "channel"){
            const id = editModal.id?? ""
            deleteChannel({channelId:id});
        }
        if(type == "category"){
            const id = editModal.id?? ""
            deleteCategoryRequest({categoryId:id});
        }
    }

    useEffect(()=>{
        if(isSuccess || channelUpdated || categoryUpdated || deleteCategorySuccess || deleteChannelSuccess){
            setName('')
            queryClient.invalidateQueries({queryKey:["fetchServersById"]});
        }
    },[categoryUpdated, channelUpdated, deleteCategorySuccess, deleteChannelSuccess, isSuccess, queryClient]);

    console.log(type, editModal.id)

    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={editModal.open}
                onOpenChange={()=>setEditModal('', '','')}
            >
                <ModalContent className="bg-[#313338]">
                    {(onClose) => (
                        <>                  
                            <ModalFooter className="flex flex-col justify-center  bg-[#2B2D31] h-22 text-[#ccc]">
                                <h3 className="text-xl text-[#b3b3b3]">Edit Name</h3>
                                <p className="flex text-[#ccc] text-sm"> {editModal.name && <Hash className="size-5"/>} {editModal.name}</p>
                                <label htmlFor="category" className=" text-sm pt-4 ">NAME</label>
                                <input 
                                className="mb-3 py-2 bg-[#161616] border border-[#464646] px-2" 
                                id="category" 
                                type="text" 
                                onChange={(e)=>setName(e.target.value)}
                                value={name}
                                />
                                    <div className="flex gap-5">
                                    <button
                                        color="primary"
                                        onClick={()=>{
                                            handleDelete();
                                            onClose()
                                        }}
                                        className="text-white bg-[#f5342e] w-full py-2 rounded-xl"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        color="primary"
                                        className="text-white bg-[#4e6ada] w-full py-2 rounded-xl"
                                        onClick={()=>{
                                            handleUpdate();                                            
                                        }}
                                    >
                                        Update
                                    </button>
                                    </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
