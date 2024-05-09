package com.sliit.social_media_project.repository;

import com.sliit.social_media_project.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
