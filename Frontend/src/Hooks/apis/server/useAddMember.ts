import { useMutation } from "@tanstack/react-query"
import { addMemberRequest } from "../../../Apis/server apis"
import { useAuthStore } from "../../../zustand/auth store/AuthStore";


export const useAddMember = () =>{
    const token = useAuthStore((state) => state.token) || '';
    const {mutateAsync:AddMember, isSuccess, error} = useMutation({
         mutationFn: ({serverId}:{serverId:string})=> addMemberRequest({serverId,token}),
                onSuccess: (data) => {
                    console.log('Successfully update server', data);
                    
                },
                onError: (error) => {
                    console.error('Failed to update server', error);
                }

    });

    return {
        AddMember,
        isSuccess,
        error
    }
}