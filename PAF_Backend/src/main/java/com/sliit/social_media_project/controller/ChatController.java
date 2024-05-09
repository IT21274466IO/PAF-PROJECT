package com.sliit.social_media_project.controller;

import com.sliit.social_media_project.models.Chat;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.request.CreateChatRequest;
import com.sliit.social_media_project.service.ChatService;
import com.sliit.social_media_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt ,@RequestBody CreateChatRequest createChatRequest) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        User user2 = userService.findUserById(createChatRequest.getUserId());
        Chat chat = chatService.createChat(reqUser, user2);
        return chat;
    }
    @GetMapping("/api/chats")
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) {

        User user = userService.findUserByJwt(jwt);
        List<Chat> chat = chatService.findUserChat(user.getId());
        return chat;
    }
}
