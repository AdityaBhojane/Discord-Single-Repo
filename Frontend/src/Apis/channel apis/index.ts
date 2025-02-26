import axiosConfig from "../../config/axiosConfig";
import { ErrorHandler } from "../Error Helper/ErrorHandler";

export const deleteChannelRequest = async ({token, channelId}:{token:string, channelId:string}) => {
    try {
        const response = await axiosConfig.delete(`/channel/${channelId}`,{
            headers:{
                "x-access-token":token
            }
        });
        return response.data;
    } catch(error) {
        console.log(error)
        ErrorHandler(error)    
    }
};

export const createChannelRequest = async({token, name, serverId, categoryId}:{token:string, name:string, serverId:string, categoryId:string})=>{
    try {
        const response = await axiosConfig.put(`/servers/${serverId}/categories/${categoryId}/channels`,{
            channelName:name
        },{
            headers:{
                "x-access-token":token
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}