import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";
import { deleteChannelRequest } from "../../../Apis/channel apis";


export const useDeleteChannel = () => {
    const token = useAuthStore((state) => state.token) || '';
    const { isPending, isSuccess, error, mutateAsync: deleteChannel } = useMutation({
        mutationFn: ({channelId}:{channelId:string})=> deleteChannelRequest({channelId,token}),
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
        deleteChannel
    };
}