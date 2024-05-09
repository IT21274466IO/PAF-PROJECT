package com.sliit.social_media_project.controller;

import com.sliit.social_media_project.models.Message;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.service.MessageService;
import com.sliit.social_media_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageController {

    @Autowired
    private MessageService  messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@PathVariable Integer chatId, @RequestBody Message req, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Message message = messageService.createMessage(user, chatId, req);
        return message;
    }

    @GetMapping("/api/messages/chat/{chatId}")
    public List<Message> findChatMessage(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwt(jwt);
        List<Message> messages = messageService.findChatsMessages(chatId);

        return messages;
    }
}
