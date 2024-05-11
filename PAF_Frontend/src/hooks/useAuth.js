import useSWRMutation from 'swr/mutation';


export const sendLoginRequest = async (url, {arg}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });
    return await response.json();
};

export const useSignIn = () => {
    const { trigger, isMutating  } = useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/auth/login`, sendLoginRequest);

    return {
        trigger,
        isMutating
    }
};

export const sendSignupRequest = async (url, {arg}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });
    return await response.json();
};

export const useSignup = () => {
    const { trigger, isMutating  } = useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, sendLoginRequest);

    return {
        trigger,
        isMutating
    }
};

const auth = {
    sendLoginRequest,useSignIn,sendSignupRequest,useSignup
}

export default auth;