package com.sliit.social_media_project.controller;

import com.sliit.social_media_project.exceptions.UserException;
import com.sliit.social_media_project.models.Story;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.service.StoryServiceImplementation;
import com.sliit.social_media_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StoryController {

    @Autowired
    private StoryServiceImplementation storyService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/story")
    public Story createStory(@RequestBody Story story, @RequestHeader("Authorization") String jwt) {
        User reqUser = userService.findUserByJwt(jwt);
        Story createdStory = storyService.createStory(story, reqUser);
        return createdStory;
    }

    @GetMapping("/api/story/user/{userId}")
    public List<Story> findUserStory(@PathVariable Integer userId, @RequestHeader("Authorization") String jwt) throws UserException {
        User reqUser = userService.findUserByJwt(jwt);
        List<Story> stories = storyService.findStoryByUserId(userId);
        return stories;
    }
}
