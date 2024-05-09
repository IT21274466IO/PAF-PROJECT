package com.sliit.social_media_project.service;

import com.sliit.social_media_project.models.Reels;
import com.sliit.social_media_project.models.User;

import java.util.List;

public interface ReelService {


    public Reels createReel(Reels reel, User user);

    public List<Reels> findAllReels();

    public List<Reels> findUsersReel(Integer userId) throws Exception;
}
