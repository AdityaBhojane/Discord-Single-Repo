import { useModalStore } from "../../zustand/modal store/ModalStore";
import {
    Modal,
    ModalContent,
    ModalFooter,
} from "@nextui-org/react";
import { useServerStore } from "../../zustand/sever store/serverStore";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useDeleteServer } from "../../Hooks/apis/server/useDeleteServer";
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeleteServerModal() {
    const setDeleteServerModal = useModalStore(state => state.setDeleteServerModal);
    const deleteServerModal = useModalStore(state => state.deleteServerModal);
    const serverDetails = useServerStore(state => state.serverDetails);
    const navigate = useNavigate()

    const QueryClient = useQueryClient()

    const { deleteServer, isSuccess } = useDeleteServer();

    const handleDeleteServer = useCallback(() => {
        deleteServer({ serverId: serverDetails.serverId })
    }, [deleteServer, serverDetails.serverId]);

    useEffect(() => {
        if (isSuccess) {
            QueryClient.invalidateQueries({ queryKey: ["fetchAllServers"] });
            navigate('/@me')
        }
    }, [QueryClient, isSuccess, navigate])

    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={deleteServerModal}
                onOpenChange={() => setDeleteServerModal()}
            >
                <ModalContent className="bg-[#313338]">
                    {(onClose) => (
                        <>
                            <ModalFooter className="flex flex-col justify-center items-center  bg-[#2B2D31] h-22 text-[#ccc]">
                                <TriangleAlert className="size-14 text-red-600" />
                                <h3 className="text-2xl text-[#e2e2e2] py-2">Are you sure ?</h3>
                                <p className="text-center px-5 pb-5">Do you really want to delete this server ? this process cannot be undone</p>
                                <div className="w-full flex gap-8">
                                    <button
                                        color="primary"
                                        className="text-white bg-[#0e5e2f] w-full py-1 rounded-xl"
                                        onClick={() => {
                                            onClose()
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        color="primary"
                                        className="text-white bg-[#6b1111] w-full py-1 rounded-xl"
                                        onClick={() => {
                                            handleDeleteServer();
                                            onClose()
                                        }}
                                    >
                                        Delete
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
