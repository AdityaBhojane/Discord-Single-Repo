import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";;
// import { useModalStore } from "../../../zustand/modal store/ModalStore";
import { createChannelRequest } from "../../../Apis/channel apis";



export const useCreateChannel = () => {
    // const setEditServerModal= useModalStore(state => state.setEditServerModal);
    const token = useAuthStore((state) => state.token) || '';

    const { isPending, isSuccess, error, mutateAsync: createChannel } = useMutation({
        mutationFn: ({name, serverId, categoryId}:{name:string,serverId:string, categoryId:string})=> createChannelRequest({serverId, categoryId,name,token}),
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
        createChannel
    };
}