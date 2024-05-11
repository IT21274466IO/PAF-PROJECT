/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate } from "react-router-dom";

// Components.................
import Stories from '../../components/stories/Stories'
import AddPost from '../../components/addPost/AddPost'
import Feeds from '../../components/feeds/Feeds'
import useAuthStore from "../../hooks/useAuthStore.js";



export default function Home() {
  const authToken = useAuthStore((state) => state.authToken)
  if (!authToken) {
    return <Navigate to="/login" replace={true} />
  }
  return (
    <>
    <Stories />
    <AddPost />
    <Feeds />
    </>
  )
}
