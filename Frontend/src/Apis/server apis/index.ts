import axiosConfig from "../../config/axiosConfig";
import { IServer } from "../../Interfaces/server";
import { ErrorHandler } from "../Error Helper/ErrorHandler";



export const createServerRequest = async ({ name, description, token }:IServer) => {
    try {
        const response = await axiosConfig.post('/servers/create', {
            name,
            description
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

export const getAllServerRequest = async ({token}:{token:string}) => {
    try {
        const response = await axiosConfig.get('/servers',{
            headers:{
                "x-access-token":token
            }
        });
        return response.data.data;
    } catch(error) {
        console.log(error)   
    }
};

export const getServerByIdRequest = async ({token, serverId}:{token:string, serverId:string | undefined}) => {
    try {
        const response = await axiosConfig.get(`/servers/${serverId}`,{
            headers:{
                "x-access-token":token
            }
        });
        return response.data.data;
    } catch(error) {
        console.log(error)
        ErrorHandler(error)    
    }
};

export const updateServerRequest = async ({token, serverId, name}:{token:string, serverId:string, name:string,}) => {
    try {
        const response = await axiosConfig.put(`/servers/${serverId}`, {
            name,
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

export const deleteServerRequest = async ({token, serverId}:{token:string, serverId:string}) => {
    try {
        const response = await axiosConfig.delete(`/servers/${serverId}`,{
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

export const addMemberRequest = async({token, serverId}:{token:string, serverId:string})=>{
    try {
        const response = await axiosConfig.put(`/servers/${serverId}/users`,{},{
            headers:{
                "x-access-token":token
            }
        });
        return response.data;
    } catch(error) {
        ErrorHandler(error)    
    }
}