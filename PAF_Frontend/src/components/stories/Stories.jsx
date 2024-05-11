/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";

import "./stories.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Fake Apis..................
import StoriesData from "../../FackApis/StoriesData";

// Components.................
import UserStory from "./UserStory";
import {useGetPostList} from "../../hooks/usePost.js";
import toast from "react-hot-toast";
import {Navigate} from "react-router-dom";
import {useGetStoryList} from "../../hooks/useStory.js";

export default function Stories() {
    const { data, error, isLoading } = useGetStoryList();
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Failed to load</div>
    if (data?.error) {
        toast.error("Session expired")
        return <Navigate to="/login" replace={true}/>
    }
  return (
    <div className="stories">
      <UserStory/>
      <Swiper style={{ width: "80%" }} slidesPerView={4} spaceBetween={10}>
        {data?.map((story) => (
          <SwiperSlide>
            <div className="story" key={story.id}>
              <div className="user">
                <img src={story?.user?.profilePic} alt="" />
              </div>
              <img src={story.image} alt="" />
              <h5>{story.caption}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
