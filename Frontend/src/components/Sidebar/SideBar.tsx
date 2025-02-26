
// import { useDisclosure } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useModalStore } from '../../zustand/modal store/ModalStore';
import DiscordIcon from '../icons svgs/DiscordIcon'
import PluseIcon from '../icons svgs/PluseIcon'
import { useNavStore } from '../../zustand/Nav Store/NavStore';
import { useGetAllServers } from '../../Hooks/apis/server/useGetAllServers';
import { Key, useEffect } from 'react';

interface ICategory {
    channels: string[]
}

export default function SideBar() {
    const navigate = useNavigate();
    const setNavigation = useNavStore((state) => state.setNavigation)
    const setCreateServerModal = useModalStore((state) => state.setCreateServerModal);
    const { servers, error } = useGetAllServers();
   
    useEffect(() => {
        if (error) {
            navigate('/error');
        }
    }, [error, navigate]);


    return (
        <div className="w-16 bg-[#1E1F22] flex flex-col items-center py-4 px-2">

            <div
                className="h-12 w-12 rounded-full bg-[#5865F2] mb-4 flex justify-center items-center cursor-pointer"
                onClick={() => {
                    navigate('/@me');
                    setNavigation()
                }}
            >
                <DiscordIcon width={'100%'} height={'100%'} />
            </div>
            {servers?.map((server: {
                categories: ICategory[];
                _id: string; icon: string; name: string;
            }, index: Key | null | undefined) => {
                // console.log(server.categories[0].channels)
                return <div
                    key={index}
                    className="h-12 w-12 rounded-full bg-gray-700 mb-4 cursor-pointer overflow-hidden"
                    onClick={() => {
                        navigate(`/channels/${server._id}/message/${server.categories[0].channels[0]}`);
                        setNavigation()
                    }}
                >
                    <img src={server.icon || `https://api.dicebear.com/9.x/initials/svg?seed=${server?.name}`} alt="server-icon" />
                </div>
            })}
            <div onClick={setCreateServerModal} className="h-12 w-12 rounded-full bg-gray-700 mt-auto cursor-pointer"><PluseIcon /></div>
        </div>
    )
}
