import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";
import { deleteServerRequest } from "../../../Apis/server apis";
import { useModalStore } from "../../../zustand/modal store/ModalStore";


export const useDeleteServer = () => {
    const token = useAuthStore((state) => state.token) || '';
    const setEditServerModal = useModalStore(state => state.setEditServerModal)
    const { isPending, isSuccess, error, mutateAsync: deleteServer } = useMutation({
        mutationFn: ({serverId}:{serverId:string})=> deleteServerRequest({serverId,token}),
        onSuccess: (data) => {
            console.log('Successfully deleted server', data);
            setEditServerModal();
            
        },
        onError: (error) => {
            console.error('Failed to delete server', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        deleteServer
    };
}