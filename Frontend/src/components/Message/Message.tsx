
interface IMessage {
    username:string,
    avatar:string,
    message:string
}


export default function Message({username, avatar, message}:IMessage) {
    return (
        <div className="flex items-center gap-2 pb-5">
            <div className="h-10 w-10 rounded-full bg-gray-700 cursor-pointer overflow-hidden" >
                <img src={avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${username}`} alt="server-icon" />
            </div>
            <div className="h-10 text-[#ccc] text-sm">
                <p className="text-green-600 font-bold">{username}</p>
                <span>{message}</span>
            </div>
        </div>
    )
}
