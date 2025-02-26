import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";;
import { useModalStore } from "../../../zustand/modal store/ModalStore";
import { createCategoryRequest } from "../../../Apis/category apis";



export const useCreateCategory = () => {
    const setEditServerModal= useModalStore(state => state.setEditServerModal);
    const token = useAuthStore((state) => state.token) || '';

    const { isPending, isSuccess, error, mutateAsync: createCategory } = useMutation({
        mutationFn: ({name, id}:{name:string,id:string})=> createCategoryRequest({serverId:id,name,token}),
        onSuccess: (data) => {
            console.log('Successfully created server', data);
            setEditServerModal()
        },
        onError: (error) => {
            console.error('Failed to create server', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        createCategory
    };
}