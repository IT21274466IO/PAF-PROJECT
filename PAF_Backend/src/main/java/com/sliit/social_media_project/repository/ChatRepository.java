package com.sliit.social_media_project.repository;

import com.sliit.social_media_project.models.Chat;
import com.sliit.social_media_project.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    public List<Chat> findByUsersId(Integer userId);

    @Query("SELECT c from Chat c WHERE :user Member of c.users AND :reqUser Member of c.users")
    public Chat findChatByUsersId(@Param("user")User user, @Param("reqUser")User reqUser);
}
