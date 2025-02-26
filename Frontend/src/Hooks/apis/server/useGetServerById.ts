import { useQuery } from "@tanstack/react-query";
import { getServerByIdRequest } from "../../../Apis/server apis";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";


export const useGetServersById = (serverId:string | undefined) => {
    const token = useAuthStore((state) => state.token) || '';

    const { isPending, isSuccess, error, data: getServerById } = useQuery({
        queryFn:()=> getServerByIdRequest({token,serverId}),
        queryKey:["fetchServersById", serverId],
        staleTime:30000
    });

    return {
        isPending,
        isSuccess,
        error,
        getServerById
    };
};