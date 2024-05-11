import useSWRMutation from 'swr/mutation';
import useSWR from 'swr'
import {sendGetRequest, sendPostRequest} from "./useRequest.js";


export const useCreateStory = () => {
    const { trigger, isMutating  } = useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/api/story`, sendPostRequest);

    return {
        trigger,
        isMutating
    }
};


export const useGetStoryList = () => {
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_SERVER_URL}/api/story`, sendGetRequest);

    return {
        data,
        error,
        isLoading
    }
};

const post = {
    useCreateStory,useGetStoryList
}

export default post;