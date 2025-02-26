import { useQuery } from '@tanstack/react-query';
import { getPaginatedMessages } from '../../../Apis/messages apis';
import { useAuthStore } from '../../../zustand/auth store/AuthStore';


export const useGetChannelMessages = (channelId:string | undefined) => {

    const token = useAuthStore((state) => state.token) || '';

    const { isFetching, isError, error, data, isSuccess  } = useQuery({
        queryFn: () => getPaginatedMessages({ channelId, limit: 10, offset: 0, token:token }),
        queryKey: ['getPaginatedMessages',channelId],
        staleTime:30000
    });

    return {
        isFetching,
        isError,
        error,
        messages: data,
        isSuccess
    };
};