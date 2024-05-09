package com.sliit.social_media_project.controller;

import com.sliit.social_media_project.models.Reels;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.service.ReelService;
import com.sliit.social_media_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReelsController {

    @Autowired
    private ReelService reelService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/reels")
    public Reels createReel(@RequestBody Reels reel,
                            @RequestHeader("Authorization") String jwt) {

        User reqUser = userService.findUserByJwt(jwt);
        Reels createdReels = reelService.createReel(reel, reqUser);
        return createdReels;
    }

    @GetMapping("/api/reels")
    public List<Reels> findAllReels() {

        List<Reels> reels = reelService.findAllReels();
        return reels;
    }

    @GetMapping("/api/reels/user/{userId}")
    public List<Reels> findUsersReels(@PathVariable Integer userId) throws Exception {

        List<Reels> reels = reelService.findUsersReel(userId);
        return reels;
    }
}
