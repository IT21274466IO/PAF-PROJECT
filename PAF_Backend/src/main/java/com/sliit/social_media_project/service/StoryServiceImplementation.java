package com.sliit.social_media_project.service;

import com.sliit.social_media_project.exceptions.UserException;
import com.sliit.social_media_project.models.Story;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImplementation implements StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserService userService;

    @Override
    public Story createStory(Story story, User user) {

        Story createdStory = new Story();

        createdStory.setImage(story.getImage());
        createdStory.setCaption(story.getCaption());
        createdStory.setTimestamp(LocalDateTime.now());
        createdStory.setUser(user);

        return storyRepository.save(createdStory);
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws UserException {

        User user = userService.findUserById(userId);
        return storyRepository.findByUserId(userId);

    }
}
