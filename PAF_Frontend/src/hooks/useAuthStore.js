import {create}  from 'zustand'

const useAuthStore = create((set) => ({
    authToken: localStorage.getItem("Token") || "",
    setAuthToken: (newAuthToken) => {
        localStorage.setItem('Token', newAuthToken);
        return set({authToken: newAuthToken})
    },
}))

export default useAuthStore;

