import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";
import {updateCategory } from "../../../Apis/category apis";
import { useModalStore } from "../../../zustand/modal store/ModalStore";



export const useUpdateCategory = () => {
    const setEditModal = useModalStore(state => state.setEditModal);
    const token = useAuthStore((state) => state.token) || '';
    const { isPending, isSuccess, error, mutateAsync: updateCategoryRequest } = useMutation({
        mutationFn: ({name, categoryId}:{name:string,categoryId:string})=> updateCategory({id:categoryId,name,token}),
        onSuccess: (data) => {
            console.log('Successfully created server', data);
            setEditModal('','','')
        },
        onError: (error) => {
            console.error('Failed to create server', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateCategoryRequest
    };
}