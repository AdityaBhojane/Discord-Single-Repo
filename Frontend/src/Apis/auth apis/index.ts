
import axiosConfig from "../../config/axiosConfig";
import { ErrorHandler } from "../Error Helper/ErrorHandler";


interface IUser {
    username?:string,
    email:string,
    password:string
}


export const signUpRequest = async ({ email, password, username }:IUser) => {
    try {
        const response = await axiosConfig.post('/auth/signup', {
            email,
            password,
            username
        });
        return response.data;
    } catch(error) {
        console.log(error)
        ErrorHandler(error)     
    }
};

export const signInRequest = async ({ email, password }:IUser) => {
    try {
        const response = await axiosConfig.post('/auth/signin', {
            email,
            password
        });
        return response.data;
    } catch(error) {
        console.log(error)
        ErrorHandler(error)    
    }
};