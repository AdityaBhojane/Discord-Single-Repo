import { useMutation } from '@tanstack/react-query';
import { signInRequest } from '../../../Apis/auth apis';
import { useAuthStore } from '../../../zustand/auth store/AuthStore';




export const useSignin = () => {
    const setToken = useAuthStore((state)=>state.setToken)
    const setUser = useAuthStore((state)=>state.setUser)

    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (response) => {
            console.log('Successfully signed in', response);
            setToken(response.data.token);
            setUser(response.data.userId);
        },
        onError: (error) => {
            console.error('Failed to sign in', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signinMutation
    };
};