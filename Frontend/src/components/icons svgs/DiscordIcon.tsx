import imageLogo from "../../assets/Logo.webp"
export default function DiscordIcon({width,height}:{width:string,height:string}) {
    return (
        <img width={width} height={height} src={imageLogo} className="object-contain rounded-full"></img>
    )
}
