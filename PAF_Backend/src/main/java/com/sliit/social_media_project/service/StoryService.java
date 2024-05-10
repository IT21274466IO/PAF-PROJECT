package com.sliit.social_media_project.service;

import com.sliit.social_media_project.exceptions.UserException;
import com.sliit.social_media_project.models.Story;
import com.sliit.social_media_project.models.User;

import java.util.List;

public interface StoryService {

    public Story createStory(Story story, User user);

    public List<Story> findStoryByUserId(Integer userId) throws UserException;

    public  List<Story> findAllStories();
}
