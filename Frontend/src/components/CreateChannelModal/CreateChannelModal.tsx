import { AudioLines, Hash, } from "lucide-react";
import { useModalStore } from "../../zustand/modal store/ModalStore";
import {
    Modal,
    ModalContent,
    ModalFooter,
} from "@nextui-org/react";
import { useCreateChannel } from "../../Hooks/apis/channel/useCreateChannel";
import { useCallback, useEffect, useState } from "react";
import { useServerStore } from "../../zustand/sever store/serverStore";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateChannelModal() {
    const [text, setText] = useState('')

    const setCreateChannelModal = useModalStore(state => state.setCreateChannelModal);
    const CreateChannelModal = useModalStore(state => state.CreateChannelModal);
    const serverDetails = useServerStore(state=>state.serverDetails)
    const QueryClient = useQueryClient()

    const {createChannel, isSuccess} = useCreateChannel();

    const handleCreateChannel = useCallback(()=>{
        if(!text) return;
        createChannel({name:text,serverId:serverDetails.serverId,categoryId:serverDetails.categoryId})
    },[createChannel, serverDetails.categoryId, serverDetails.serverId, text]);

    useEffect(()=>{
        if(isSuccess){
            QueryClient.invalidateQueries({queryKey:["fetchServersById"]});
            setText('')
        }
    },[QueryClient, isSuccess])
    
    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={CreateChannelModal}
                onOpenChange={()=>setCreateChannelModal()}
            >
                <ModalContent className="bg-[#313338]">
                    {(onClose) => (
                        <>
                            <ModalFooter className="flex flex-col justify-center  bg-[#2B2D31] h-22 text-[#ccc]">
                                <h3 className="text-xl text-[#b3b3b3]">Create Channel</h3>
                                <p className=" text-sm pt-4 ">Channel Type</p>
                                <div className="w-full">
                                    <div className="flex flex-col space-y-4">
                                        <label className="flex items-center border border-[#5e5e5e] justify-between bg-[#232323] px-3 py-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="communication"
                                                value="text"
                                                className="hidden peer"
                                                defaultChecked
                                            />
                                            <div className="flex items-center space-x-3">
                                                <Hash />
                                                <div>
                                                    <div className="text-md ">Text</div>
                                                    <div className="text-gray-500 text-sm">Send messages, images, emoji, opinions and puns</div>
                                                </div>
                                            </div>
                                            <div className="peer-checked:bg-blue-100  border border-gray-500 rounded-full w-5 h-5 flex items-center justify-center">
                                                <div className="w-3 h-3 rounded-full bg-[#7f7f7f]"></div>
                                            </div>
                                        </label>
                                        <label className="flex items-center border border-[#5e5e5e] justify-between bg-[#232323] px-3 py-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="communication"
                                                value="voice"
                                                className="hidden peer"
                                                disabled
                                            />
                                            <div className="flex items-center space-x-3">
                                                <AudioLines/>
                                                <div>
                                                    <div className="text-md">Voice <span className="text-[13px] text-red-500"> (not allowed)</span></div>
                                                    <div className="text-gray-500 text-sm">Hang out together with  video and screen share</div>
                                                </div>
                                            </div>
                                            <div className="peer-checked:bg-blue-100 peer-checked:border-blue-600 border border-gray-500 rounded-full w-5 h-5 flex items-center justify-center">
                                                <div className="w-3 h-3 rounded-full bg-[#7f7f7f]"></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <label htmlFor="category" className=" text-sm pt-4 ">Channel Name</label>
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
                                        handleCreateChannel()
                                        onClose()
                                    }}
                                >
                                    Create Channel
                                </button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}
