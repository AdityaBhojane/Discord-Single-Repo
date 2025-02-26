import { useParams } from "react-router-dom";
import DiscordInput from "../DiscordInput/DiscordInput";
import HashIcon from "../icons svgs/HashIcon";
import MembersIcon from "../icons svgs/MembersIcon";
import { NotificationIcon } from "../icons svgs/NotificationIcon";
import PinIcon from "../icons svgs/PinIcon";
import QuesMarkIcon from "../icons svgs/QuesMarkIcon";
import SearchIcon from "../icons svgs/SearchIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketContext } from "../../zustand/socket/useSocketContext";
import { useEffect, useRef, useState } from "react";
import { useGetChannelMessages } from "../../Hooks/apis/channel/useGetChannelMessages";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import Message from "../Message/Message";
import { useModalStore } from "../../zustand/modal store/ModalStore";



interface MessageType {
    image: string;
    body: string;
    senderId: {
        username: string;
        avatar: string;
    };
}


export default function MessageContent() {
    const setImagePreviewModal = useModalStore((state) => state.setImagePreviewModal);
    // const ImagePreviewModal = useModalStore((state) => state.ImagePreviewModal);
    const { channelId } = useParams<{ channelId: string }>();

    const queryClient = useQueryClient();
    // which is better having global state or local
    const [ messageList, setMessageList ] = useState<MessageType[]>([]);


    const joinChannel = useSocketContext((state=> state.joinChannel));
    const socket = useSocketContext((state=> state.socket));

 
    const { messages , isFetching, isError,  isSuccess } = useGetChannelMessages(channelId?? "");


    const messageContainerListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(messageContainerListRef.current) {
            messageContainerListRef.current.scrollTop = messageContainerListRef.current.scrollHeight;
        }
        socket.on('NewMessageReceived', (data) => {
            console.log('New message received', data);
            setMessageList([...messageList, data]);
        });
    }, [messageList]);

    useEffect(() => {
        console.log("ChannelId", channelId);
        if (channelId) { 
            queryClient.invalidateQueries({ queryKey: ["getPaginatedMessages", channelId] });
        }
    }, [channelId, queryClient]);
    

    useEffect(() => {
        if(!isFetching && !isError) {
            joinChannel(channelId?? "");
        }
    }, [isFetching, isError, joinChannel, channelId]);

    useEffect(() => {
        if(isSuccess ) {
            console.log('Channel Messages fetched');
            setMessageList(messages);
        }
    }, [isSuccess, messages, setMessageList, channelId]);

    
    if(isFetching ) {
        return (
            <div
                className='h-full flex-1 flex items-center justify-center'
            >
                <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
            </div>
        );
    }
    

    if(isError) {
        return (
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel Not found</span>
            </div>
        );
    };

    // console.log("LIST",messageList)
    return (
        <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 bg-[#313338] border-b border-gray-700">
                <div className="flex items-center gap-2 text-[#c3c7ce] text-sm">
                    <HashIcon />
                    <p className="text-sm font-semibold">general</p>
                </div>
                <div className="flex items-center gap-2 text-[#c3c7ce] text-sm">
                    <NotificationIcon />
                    <PinIcon />
                    <MembersIcon />
                    <div className="flex items-center ">
                        <input type="text" placeholder='Search' className='bg-[#202225] text-[#96989D] py-1 w-full text-sm  px-3 ' />
                        <SearchIcon />
                    </div>
                    <QuesMarkIcon />
                </div>
            </div>
            <hr className='border-[#404247]' />
            {/* Content */}
            <div 
            className="bg-[#313338]  p-4 w-full min-h-[80%] overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-900 h-64 " 
            ref={messageContainerListRef}
            >
                {messageList?.map((chat, index)=>{
                    return (
                        <div key={index}>
                            <Message message={chat?.body} username={chat.senderId.username} avatar={chat.senderId.avatar} />
                            {chat?.image && <img className="w-[350px] rounded-xl pb-5 cursor-pointer" 
                            onClick={()=>{
                                setImagePreviewModal(chat.image); 
                            }}
                            src={chat.image} 
                            alt="chat-image" 
                            />}
                        </div>
                    )
                })}
            </div>
            <div className="flex h-full">
                <div className="flex-1 flex flex-col  justify-center bg-[#313338]">
                    <DiscordInput />
                </div>
            </div>
            
        </div>
    )
}
