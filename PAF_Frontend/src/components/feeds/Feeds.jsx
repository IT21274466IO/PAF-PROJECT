/* eslint-disable no-unused-vars */
import React from 'react';
import './feeds.css'

// Components..................
import Feed from './Feed';

//Fake Apis.................
import HomeFeedData from '../../FackApis/HomeFeedData';
import {useGetPostList} from "../../hooks/usePost.js";
import {Navigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

export default function Feeds() {
  const { data, error, isLoading } = useGetPostList();
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>
  if (data?.error) {
    toast.error("Session expired")
    return <Navigate to="/login" replace={true}/>
  }
  return (
    <div className='feeds'>
      <Toaster />
      {
        data?.map((feed) => (
          <Feed feed={feed} key={feed.id} />
        ))
      }
    </div>
  );
}