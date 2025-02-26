// import { Link, useNavigate } from "react-router-dom";
import MembersIcon from "../icons svgs/MembersIcon";
import { NotificationIcon } from "../icons svgs/NotificationIcon";
import QuesMarkIcon from "../icons svgs/QuesMarkIcon";
import SpeakerIcon from "../icons svgs/SpeakerIcon";
import Room from "../../pages/Room/Room";
import { useParams } from "react-router-dom";

export default function VoiceMessageContent() {
    // const navigate = useNavigate()
    const {serverId}  = useParams<{serverId: string}>();
    const {channelId}  = useParams<{channelId: string}>();

    console.log(serverId, channelId);

    return (
        <div className="flex-1 flex flex-col  ">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 bg-[#000] border-b border-gray-700">
                <div className="flex items-center gap-2 text-[#c3c7ce] text-sm">
                    <SpeakerIcon />
                    <p className="text-sm font-semibold">general</p>
                </div>
                <div className="flex items-center gap-2 text-[#c3c7ce] text-sm">
                    <NotificationIcon />
                    <MembersIcon />
                    <QuesMarkIcon />
                </div>
            </div>
            <hr className='border-[#404247]' />
            <div className="w-full h-screen bg-black flex items-center justify-center">
                {/* <div className="text-center">
                    <p className="text-3xl font-semibold my-2">General</p>
                    <span className="text-red-600 font-bold">THIS IS A EXPERIMENTAL FEATURE</span>
                    <br />
                    <Link 
                    className="bg-[#248045] px-5 p-2 rounded-full my-4 inline-block"
                    to={"https://video-calling-frontend-phi.vercel.app/"}
                    >Test Now</Link>
                </div> */}
                <Room serverId={serverId} channelId={channelId}/>
            </div>
        </div>
    )
}
