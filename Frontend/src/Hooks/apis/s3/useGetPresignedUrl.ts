import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";
import { getPresignedUrl } from "../../../Apis/s3";


export const useGetPresignedUrl = ()=>{
    const token = useAuthStore((state) => state.token) || '';
    const {isFetching, isError, error, data:url} = useQuery({
        queryKey:['getPreSignUrl'],
        queryFn: ()=> getPresignedUrl({token})
    });

    return {
        isError,
        isFetching,
        error,
        url
    }
};

