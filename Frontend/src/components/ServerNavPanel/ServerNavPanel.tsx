import { useNavigate, useParams } from "react-router-dom";
import { useModalStore } from "../../zustand/modal store/ModalStore";
import CategoriesToggle from "../CategoriesToggle/CategoriesToggle";
import Channels from "../Channels/Channels";
import DiscordIcon from "../icons svgs/DiscordIcon";
import EventIcon from "../icons svgs/EventIcon";

import { useGetServersById } from "../../Hooks/apis/server/useGetServerById";
import { useCallback, useEffect, useState } from "react";
import { useSocketContext } from "../../zustand/socket/useSocketContext";
// import { getJoinedUsers } from "../../Apis/joinedUsers";
// import { useAuthStore } from "../../zustand/auth store/AuthStore";
import EditServerModal from "../EditServerModal/EditServerModal";
import { useServerStore } from "../../zustand/sever store/serverStore";
import { Headphones, Mic, Settings } from "lucide-react";



export default function ServerNavPanel() {
    const setEditServerModal = useModalStore((state) => state.setEditServerModal);
    const setServerDetails = useServerStore(state=>state.setServerDetails);
    const navigate = useNavigate();
    const { serverId } = useParams();
    const [categoryId, setCategoryId] = useState('')
    const socket = useSocketContext((state => state.socket));
    const setEditModal = useModalStore(state => state.setEditModal);
    //isPending,isSuccess, error, add this in future
    const { getServerById } = useGetServersById(serverId);
    // const [usersJoined, setUsersJoined] = useState(false);
    // const token = useAuthStore((state) => state.token);
  


    const handleConnect = useCallback(
        (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            // handleJoinedUsers();

            socket.emit("join-room", { email: "email", room: serverId });
        },
        [serverId, socket]
    );




    useEffect(() => {
        // if (usersJoined) {
        //     navigate(`/channels/${serverId}/${getServerById?.categories[0].channels[0]._id}`)
        //     return;
        // }
        socket.on("join-room", () => {
            navigate(`/channels/${serverId}/${getServerById?.categories[0].channels[0]._id}/voice`)
        });

        return () => { socket.off("join-room",) };
    }, [ navigate, serverId, getServerById?.categories, socket]);


   useEffect(()=>{
    if(serverId || categoryId){
        setServerDetails(serverId?? "", categoryId?? "")
    }
   },[categoryId, serverId, setServerDetails]);



    return (
        <>
            <div className="w-60 bg-[#2B2D31] border-r flex flex-col border-gray-700">
                <div className="w-full p-2 hover:bg-[#f1f1f111] cursor-pointer flex items-center">
                    <p className="px-3 text-md text-[#d6d6d6] font-semibold">{getServerById?.name}</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                        className={`w-4 h-4 mr-2 ml-auto transition-all rotate-90`}
                        onClick={setEditServerModal}
                    >
                        <path
                            clipRule="evenodd"
                            d="m5.41667 4.2625 5.66573 5.7375-5.66573 5.7375 1.74426 1.7625 7.42237-7.5-7.42237-7.5z"
                            fill="#cccccc"
                            fillRule="evenodd"
                        />
                    </svg>
                </div>
                <hr className="border border-[#3f3a3a]" />
                <div className="p-2 ">
                    <div className="w-full p-2 px-3 hover:bg-[#f1f1f111] cursor-pointer flex items-center rounded-lg">
                        <EventIcon />
                        <p className="px-3 text-[#a5a5a5] text-sm">Events</p>
                    </div>
                </div>
                <hr className="border border-[#3f3a3a]" />
                <div>
                    {getServerById?.categories.map((category: {
                        _id: string | undefined;
                        channels(channels: { name: string }): unknown; name: string;
                    },) => {
                        const channelArray = category?.channels ? Object.values(category.channels) : [];
                        console.log("LOG", channelArray)
                        return (
                            <div 
                            onClick={()=>setCategoryId(category._id?? "")}
                            >
                                <CategoriesToggle
                                    key={category._id}
                                    categoryName={category?.name.toUpperCase()}
                                    categoryId={category._id ?? ''}
                                >
                                    {channelArray.map((channel) => {
                                        return (
                                            <div
                                                key={channel._id}
                                                className=""
                                                onClick={() => {
                                                    navigate(`/channels/${serverId}/message/${channel._id}`)
                                                }}
                                                onContextMenu={(e) => {
                                                    e.preventDefault();
                                                    setEditModal(channel.name, "channel", channel._id)
                                                }}
                                            >
                                                <Channels text={channel.name} type={"text"} />
                                            </div>
                                        )
                                    })}
                                </CategoriesToggle>

                            </div>
                        )
                    })}
                </div>
                <CategoriesToggle key={Date.now()} categoryName={"VOICE CHANNELS"} >
                    <div className="relative" onClick={(e) => {
                        // if (usersJoined) return;
                        handleConnect(e)
                    }}
                    >
                        {/* <span className="text-[10px] px-4 font-bold text-[#ec9090] absolute top-[50%] right-0 -translate-y-[50%]">{usersJoined && "FULL"}</span> */}
                        <Channels text={`general`} type={"voice"} />
                    </div>
                </CategoriesToggle>
                <div className="w-full p-3 h-fit rounded-lg flex gap-3 bg-[#232428] mt-auto">
                    <div className="h-10 w-10 rounded-full bg-[#09788b]  flex justify-center items-center cursor-pointer">
                        <DiscordIcon width={'100%'} height={'100%'} />
                    </div>
                    <div className="h-10">
                        <h3 className="text-sm ">Aditya</h3>
                        <p className='text-[12px]'>online</p>
                    </div>
                    <div className="h-10 flex items-center gap-2 ml-auto">
                        <Mic className="size-5 cursor-pointer text-[#ccc]"/>
                        <Headphones className="size-5 cursor-pointer text-[#ccc]" />
                        <Settings className="size-5 cursor-pointer text-[#ccc]"/>
                    </div>
                </div>
            </div>
            <EditServerModal serverId={serverId}/>
        </>

    )
}
