package com.sliit.social_media_project.repository;

import com.sliit.social_media_project.models.WorkoutPlan;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {
    @EntityGraph(attributePaths = {"user"})
    Optional<WorkoutPlan> findById(Long id);

    @EntityGraph(attributePaths = {"user"})
    List<WorkoutPlan> findAll();
}

