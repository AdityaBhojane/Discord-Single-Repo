import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";
import { updateServerRequest } from "../../../Apis/server apis";
import { useModalStore } from "../../../zustand/modal store/ModalStore";


export const useUpdateServer = () => {
    const setEditModal = useModalStore(state => state.setEditModal);
    const setEditServerModal = useModalStore(state => state.setEditServerModal)
    const token = useAuthStore((state) => state.token) || '';
    const { isPending, isSuccess, error, mutateAsync: updateServer } = useMutation({
        mutationFn: ({name, serverId}:{name:string, serverId:string})=> updateServerRequest({name,serverId,token}),
        onSuccess: (data) => {
            console.log('Successfully update server', data);
            setEditModal('','','');
            setEditServerModal()
            
        },
        onError: (error) => {
            console.error('Failed to update server', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateServer
    };
}