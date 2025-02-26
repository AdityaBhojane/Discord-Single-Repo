import { useMutation } from "@tanstack/react-query";
import { updateChannel } from "../../../Apis/joinedUsers";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";
import { useModalStore } from "../../../zustand/modal store/ModalStore";




export const useUpdateChannel = () => {
    const setEditModal = useModalStore(state => state.setEditModal);
    const token = useAuthStore((state) => state.token);

    const { mutateAsync:updateChannelRequest, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: ({ name, channelId }: { name: string; channelId: string }) => updateChannel({ channelId, name, token }),
        onSuccess: () => {
            console.log('Successfully updated channel');
            setEditModal('','','')
        },
        onError: () => {
            console.error('Failed to update channel');
        }
    });

    return { updateChannelRequest, isPending, isError, error, isSuccess };

}