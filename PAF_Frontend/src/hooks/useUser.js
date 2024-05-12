import useSWRMutation from 'swr/mutation';
import useSWR from 'swr'
import {sendGetRequest, sendPutRequest} from "./useRequest.js";


export const useUpdateUser = () => {
    const { trigger, isMutating  } = useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/api/users/updateUser`, sendPutRequest);

    return {
        trigger,
        isMutating
    }
};


export const useGetUser = (id) => {
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_SERVER_URL}/api/users/${id}`, sendGetRequest);

    return {
        data,
        error,
        isLoading
    }
};

export const useGetUserByToken = () => {
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_SERVER_URL}/api/users/profile`, sendGetRequest);

    return {
        data,
        error,
        isLoading
    }
};

const post = {
    useGetUser,useUpdateUser,useGetUserByToken
}

export default post;