package com.sliit.social_media_project.repository;

import com.sliit.social_media_project.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    public List<Message> findByChatId(Integer chatId);
}
