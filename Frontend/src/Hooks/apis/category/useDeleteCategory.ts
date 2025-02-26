import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";
import { deleteCategory } from "../../../Apis/category apis";



export const useDeleteCategory = () => {
    const token = useAuthStore((state) => state.token) || '';
    const { isPending, isSuccess, error, mutateAsync: deleteCategoryRequest } = useMutation({
        mutationFn: ({categoryId}:{categoryId:string})=> deleteCategory({id:categoryId,token}),
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
        deleteCategoryRequest
    };
}