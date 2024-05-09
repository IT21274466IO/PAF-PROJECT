package com.sliit.social_media_project.service;

import com.sliit.social_media_project.models.Reels;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.repository.ReelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReelServiceImpl implements ReelService{

    @Autowired
    private ReelRepository reelRepository;

    @Autowired
    private UserService userService;

    @Override
    public Reels createReel(Reels reel, User user) {

        Reels createReel = new Reels();

        createReel.setTitle(reel.getTitle());
        createReel.setVideo(reel.getVideo());
        createReel.setUser(user);

        return reelRepository.save(createReel);

    }

    @Override
    public List<Reels> findAllReels() {
        return reelRepository.findAll();
    }

    @Override
    public List<Reels> findUsersReel(Integer userId) throws Exception {

        userService.findUserById(userId);
        return reelRepository.findByUserId(userId);
    }
}
