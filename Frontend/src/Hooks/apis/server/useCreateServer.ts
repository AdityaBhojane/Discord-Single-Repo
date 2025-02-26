import { useMutation } from "@tanstack/react-query";
import { createServerRequest } from "../../../Apis/server apis";
import { IServer } from "../../../Interfaces/server";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";


export const useCreateServer = () => {
    const token = useAuthStore((state) => state.token) || '';
    const { isPending, isSuccess, error, mutateAsync: createServerMutation } = useMutation({
        mutationFn: ({name, description}:IServer)=> createServerRequest({name,description,token}),
        onSuccess: (data) => {
            console.log('Successfully created server', data);
        },
        onError: (error) => {
            console.error('Failed to create server', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        createServerMutation
    };
};