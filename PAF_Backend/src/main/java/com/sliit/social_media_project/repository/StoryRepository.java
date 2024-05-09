package com.sliit.social_media_project.repository;

import com.sliit.social_media_project.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Integer> {
    public List<Story> findByUserId(Integer userId);
}
