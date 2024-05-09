package com.sliit.social_media_project.service;

import com.sliit.social_media_project.models.Chat;
import com.sliit.social_media_project.models.User;

import java.util.List;

public interface ChatService {

    public Chat createChat(User reqUser, User user2);

    public Chat findChatById(Integer chatId) throws Exception;

    public List<Chat> findUserChat(Integer userId);
}
