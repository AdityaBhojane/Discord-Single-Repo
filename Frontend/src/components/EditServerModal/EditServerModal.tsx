import {
    Modal,
    ModalContent,
} from "@nextui-org/react";
import { useModalStore } from "../../zustand/modal store/ModalStore";
import InviteIcon from "../icons svgs/InviteIcon";
import SettingsIcon from "../icons svgs/SettingsIcon";
import CreateChannelIcon from "../icons svgs/CreateChannelIcon";
import CreateCategoryIcon from "../icons svgs/CreateCategoryIcon";
import NotificationMini from "../icons svgs/NotificationMini";
import EditProfileIcon from "../icons svgs/EditProfileIcon";
import { LogOut, Trash } from "lucide-react";
import { useAuthStore } from "../../zustand/auth store/AuthStore";
import { useNavigate } from "react-router-dom";




const EditServerModal= ({serverId}:{serverId:string | undefined}) => {
    const EditServerModal = useModalStore((state) => state.EditServerModal);
    const setDeleteServerModal = useModalStore(state=> state.setDeleteServerModal)
    const setEditServerModal = useModalStore((state) => state.setEditServerModal);
    const setInvitePeopleModal = useModalStore((state) => state.setInvitePeopleModal);
    const setCreateCategoryModal = useModalStore(state => state.setCreateCategoryModal);
    // const setCreateChannelModal = useModalStore(state => state.setCreateChannelModal);
    const setEditModal = useModalStore(state => state.setEditModal);
    const setAuthClear = useAuthStore(state=> state.setClearAuth);
    const navigate = useNavigate()
    

    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={EditServerModal}
                onOpenChange={setEditServerModal}
                backdrop="transparent"
                radius="sm"
                className="absolute top-0 left-12 w-[220px]"
            >
                <ModalContent className="bg-[#111214]">
                    <>
                        <div className="p-2 py-3 flex flex-col gap-2 mt-5 mb-2">
                            <div 
                            className="p-2 rounded-sm hover:bg-[#5865F2] flex items-center justify-between cursor-pointer group"
                            onClick={()=>{
                                setInvitePeopleModal();
                                setEditServerModal();
                            }}
                            >
                                <p className="text-[#949CF7] text-sm group-hover:text-white">Invite People</p>
                                <InviteIcon/>
                            </div>
      
                            <div 
                            // onClick={setCreateChannelModal} 
                            className="p-2 rounded-sm hover:bg-[#5865F2] flex items-center justify-between cursor-pointer"
                            >
                                <p className="text-[#7e7e7e] text-sm">Create Channel</p>
                                <CreateChannelIcon/>
                            </div>
                            <div onClick={()=>setCreateCategoryModal()} className="p-2 rounded-sm hover:bg-[#5865F2] flex items-center justify-between cursor-pointer">
                                <p className="text-white text-sm">Create Category</p>
                                <CreateCategoryIcon/>
                            </div>
                            <div className="p-2 rounded-sm hover:bg-[#5865F2] flex items-center justify-between cursor-pointer">
                                <p className="text-white text-sm">Notification Settings</p>
                                <NotificationMini/>
                            </div>
                            <div onClick={()=>{
                                const id = serverId?? "";
                                setEditModal('','category',id)
                                }} 
                                className="p-2 rounded-sm hover:bg-[#5865F2] flex items-center justify-between cursor-pointer">
                                <p className="text-white text-sm">Edit Server</p>
                                <EditProfileIcon/>
                            </div>
                            <div className="p-2 rounded-sm hover:bg-[#5865F2] flex items-center justify-between cursor-pointer">
                                <p className="text-[#7e7e7e] text-sm">Server Settings</p>
                                <SettingsIcon/>
                            </div>
                            <div onClick={()=>{
                                setAuthClear();
                                navigate('/signin')
                                }} className="p-2 rounded-sm hover:bg-[#5865F2] flex items-center justify-between cursor-pointer">
                                <p className="text-red-500 text-sm">LogOut</p>
                                <LogOut className="text-[#fe3f3f] size-5"/>
                            </div>
                            <div onClick={setDeleteServerModal} className="p-2 rounded-sm hover:bg-[#5865F2] flex items-center justify-between cursor-pointer">
                                <p className="text-red-500 text-sm">Delete Server</p>
                                <Trash className="text-[#f32424] size-5"/>
                            </div>
                        </div>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditServerModal;
