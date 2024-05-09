package com.sliit.social_media_project.service;

import com.sliit.social_media_project.models.Chat;
import com.sliit.social_media_project.models.Message;
import com.sliit.social_media_project.models.User;

import java.util.List;

public interface MessageService {

    public Message createMessage(User user, Integer chatId, Message req) throws Exception;

    public List<Message> findChatsMessages(Integer chatId) throws Exception;
}
