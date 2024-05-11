import useSWRMutation from 'swr/mutation';
import useSWR from 'swr'
import {sendGetRequest, sendPostRequest} from "./useRequest.js";


export const useCreatePost = () => {
    const { trigger, isMutating  } = useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/api/posts`, sendPostRequest);

    return {
        trigger,
        isMutating
    }
};


export const useGetPostList = () => {
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_SERVER_URL}/api/posts`, sendGetRequest);

    return {
        data,
        error,
        isLoading
    }
};

const post = {
    useCreatePost,useGetPostList
}

export default post;