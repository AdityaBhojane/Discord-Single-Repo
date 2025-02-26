import axiosConfig from "../../config/axiosConfig";
import { ErrorHandler } from "../Error Helper/ErrorHandler";


interface IUser {
    channelId:string | undefined,
    data?:number,
    name?:string,
    token:string | null
}


export const JoinedUsers = async ({ channelId, data, token }:IUser) => {
    
    try {
        const response = await axiosConfig.put(`/channel/${channelId}`,{
            joinedUsers:data,
        },{
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

export const updateChannel = async ({ channelId, name, token }:IUser) => {
    
    try {
        const response = await axiosConfig.put(`/channel/${channelId}`,{
            name:name,
        },{
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

export const getJoinedUsers = async ({channelId, token}:IUser) => {
    try {
        const response = await axiosConfig.get(`/channel/${channelId}`,{
            headers:{
                "x-access-token":token
            }
        });
        return response.data;
    } catch(error) {
        console.log(error)
        ErrorHandler(error)     
    }
}