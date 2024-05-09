package com.sliit.social_media_project.repository;

import com.sliit.social_media_project.models.Reels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReelRepository extends JpaRepository<Reels, Integer> {

    public List<Reels> findByUserId(Integer userId);
}
