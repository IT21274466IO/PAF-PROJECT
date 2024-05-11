/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate } from "react-router-dom";

// Components.................
import Stories from '../../components/stories/Stories'
import AddPost from '../../components/addPost/AddPost'
import Feeds from '../../components/feeds/Feeds'
import useAuthStore from "../../hooks/useAuthStore.js";
import {useGetPostList} from "../../hooks/usePost.js";
import toast from "react-hot-toast";
import {useGetUserByToken} from "../../hooks/useUser.js";
import useUserStore from "../../hooks/useUserStore.js";



export default function Home() {
  const setUser = useUserStore((state) => state.setUser)
  const authToken = useAuthStore((state) => state.authToken)
  if (!authToken) {
    return <Navigate to="/login" replace={true} />
  }
  const { data, error, isLoading } = useGetUserByToken();
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>
  if (data?.error) {
    toast.error("Session expired")
    return <Navigate to="/login" replace={true}/>
  }else{
    setUser(data);
  }
  return (
    <>
    <Stories />
    <AddPost />
    <Feeds />
    </>
  )
}
