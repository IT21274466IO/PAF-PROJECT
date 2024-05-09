package com.sliit.social_media_project.service;

import com.sliit.social_media_project.models.WorkoutPlan;

import java.util.List;

public interface WorkoutPlanService {
    WorkoutPlan saveWorkoutPlan(WorkoutPlan WorkoutPlan, Integer userId) throws Exception;
    WorkoutPlan getWorkoutPlanById(Long id);
    List<WorkoutPlan> getAllWorkoutPlans();

    WorkoutPlan updateWorkoutPlan(Long id, WorkoutPlan updatedWorkoutPlan, Integer userId) throws Exception;

    void deleteWorkoutPlan(Long id, Integer userId) throws Exception;
}
