import {
    Modal,
    ModalContent,
} from "@nextui-org/react";
import { useModalStore } from "../../zustand/modal store/ModalStore";
import { useState } from "react";
import { useServerStore } from "../../zustand/sever store/serverStore";
import { useGetServersById } from "../../Hooks/apis/server/useGetServerById";



const InviteModal = () => {
    const InvitePeople = useModalStore((state) => state.InvitePeople);
    const setInvitePeopleModal = useModalStore((state) => state.setInvitePeopleModal);
    const [copySuccess, setCopySuccess] = useState(false);
    const serverDetails = useServerStore(state => state.serverDetails)

    const {getServerById} = useGetServersById(serverDetails.serverId);
    console.log(getServerById)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`http://localhost:5173/channels/${serverDetails?.serverId}/${getServerById?.joinCode}/users`)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            })
    }


        return (
            <>
                <Modal
                    isDismissable={false}
                    isKeyboardDismissDisabled={true}
                    isOpen={InvitePeople}
                    onOpenChange={setInvitePeopleModal}
                    backdrop="transparent"
                    radius="sm"
                    size="md"
                    className=""
                >
                    <ModalContent className="bg-[#242629]">
                        <>
                            <div className="p-5 py-3 flex flex-col gap-2 mt-5 mb-2">
                                <div className="bg-[#242629] text-white rounded-lg w-96 shadow-lg">
                                    <div className="px-4 py-3  flex items-center justify-between">
                                        <h2 className="text-lg font-semibold">Invite Friends</h2>
                                        <button className="text-gray-400 hover:text-white">
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 9l-7-7m0 0l7 7m-7-7h14"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="px-4 py-5">
                                        <p className="text-sm mb-3">
                                            Share this link with others to grant access to your server:
                                        </p>
                                        <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
                                            <input
                                                type="text"
                                                readOnly
                                                value={`http://localhost:5173/channels/${serverDetails?.serverId}/${getServerById?.joinCode}/users`}
                                                className="bg-transparent text-sm flex-1 focus:outline-none"
                                            />
                                            <button onClick={copyToClipboard} className="ml-2 text-blue-500 hover:text-blue-400">
                                               {copySuccess ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <div className="mt-4">
                                            <button className="flex items-center text-sm text-gray-400 hover:text-white">
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M6 2a2 2 0 00-2 2v10a2 2 0 002 2h5l5 5V4a2 2 0 00-2-2H6z" />
                                                </svg>
                                                Edit Invite Link Expiration
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </ModalContent>
                </Modal>
            </>
        );
    }

    export default InviteModal;
