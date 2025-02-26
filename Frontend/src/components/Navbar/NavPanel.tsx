
import DiscordIcon from "../icons svgs/DiscordIcon";
import Friends from "../icons svgs/Friends";
import HeadphonesIcon from "../icons svgs/HeadphonesIcon";
import MicIcon from "../icons svgs/MicIcon";
import PulseSmallIcon from "../icons svgs/PulseSmallIcon";
import SettingsIcon from "../icons svgs/SettingsIcon";


export default function NavPanel() {

    return (
        <div className="w-60 bg-[#2B2D31] border-r flex flex-col border-gray-700">
            <div className="text-center w-full p-2">
                <input type="text" placeholder='Find or start a conversation' className='bg-[#202225] text-[#96989D] w-full text-sm p-2' />
            </div>
            <div className="mx-2 p-3 flex items-center rounded-md gap-3 cursor-pointer hover:bg-[#42464db9]">
                <Friends />
                <p className="text-md ">Friends</p>
            </div>
            <div className="mx-2 p-3 flex items-center justify-between text-[#949BA4] ">
                <p className="text-[14px]">Direct Messages</p>
                <PulseSmallIcon />
            </div>

            <div className="w-full p-3 h-fit rounded-lg flex gap-3 bg-[#232428] mt-auto">
                <div className="rounded-full bg-[#09788b]  flex justify-center items-center cursor-pointer p-2">
                    <DiscordIcon width='25px' height='25px' />
                </div>
                <div className="h-10">
                    <h3 className="text-sm ">Aditya</h3>
                    <p className='text-[12px]'>online</p>
                </div>
                <div className="h-10 flex items-center gap-2 ml-auto">
                    <MicIcon />
                    <HeadphonesIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>

    )
}
