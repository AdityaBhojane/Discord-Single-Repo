import { useQuery } from "@tanstack/react-query";
import { getAllServerRequest } from "../../../Apis/server apis";
import { useAuthStore } from "../../../zustand/auth store/AuthStore";


export const useGetAllServers = () => {
    const token = useAuthStore((state) => state.token) || '';
    const { isPending, isSuccess, error, data: servers } = useQuery({
        queryFn:()=> getAllServerRequest({token}),
        queryKey:["fetchAllServers"],
        staleTime:30000
    });

    return {
        isPending,
        isSuccess,
        error,
        servers
    };
};