
import HashIconSmall from "../icons svgs/HashIconSmall";
import SpeakerIcon from "../icons svgs/SpeakerIcon";

export default function Channels({text,type}:{text:string, type:string}) {


    return (
        <div 
        className="px-2 "
        >
            <div className="w-full p-2 px-3 hover:bg-[#f1f1f111] cursor-pointer flex items-center rounded-lg">
                {type=="text"? <HashIconSmall />:<SpeakerIcon/>}
                <p className="px-3 text-[#a5a5a5] text-sm">{text}</p>
            </div>
        </div>
    )
}
