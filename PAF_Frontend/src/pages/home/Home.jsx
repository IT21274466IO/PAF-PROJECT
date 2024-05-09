/* eslint-disable no-unused-vars */
import React from 'react'

// Components.................
import Stories from '../../components/stories/Stories'
import AddPost from '../../components/addPost/AddPost'
import Feeds from '../../components/feeds/Feeds'



export default function Home() {
  return (
    <>
    <Stories />
    <AddPost />
    <Feeds />
    </>
  )
}
