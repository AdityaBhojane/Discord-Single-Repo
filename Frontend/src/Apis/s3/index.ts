import axiosConfig from '../../config/axiosConfig'
import axios from 'axios'

interface UploadImageParams {
    url: string;
    file: File;
}

export const uploadImageToAWS = async({url, file}:UploadImageParams)=>{
    try {
        const response = await axios.put(url,file,{
            headers:{
                'Content-Type':file.type
            }
        });
        return response;
    } catch (error) {
        console.log('Error in uploading file to aws' , error)
    }
}


export const getPresignedUrl = async ({token}:{token:string})=>{
    try {
        const response = await axiosConfig.get("messages/pre-signed-url",{
            headers:{
               'x-access-token':token
            }
        });
        return response?.data?.data
    } catch (error) {
        console.log('Error in getting pre signed url' , error)
    }
}