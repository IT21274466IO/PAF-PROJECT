package com.sliit.social_media_project.service;

import com.sliit.social_media_project.models.WorkoutPlan;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.repository.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private UserService userService;

    @Override
    public WorkoutPlan saveWorkoutPlan(WorkoutPlan workoutPlan, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        if (user == null) {
            throw new Exception("User not found with id: " + userId);
        }

        workoutPlan.setUser(user); // Associate the workout plan with the user
        return workoutPlanRepository.save(workoutPlan);
    }

@Override
    public WorkoutPlan getWorkoutPlanById(Long id) {
        return workoutPlanRepository.findById(id).orElse(null);
    }

    @Override
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    @Override
    public WorkoutPlan updateWorkoutPlan(Long id, WorkoutPlan updatedWorkoutPlan, Integer userId) throws Exception {
        // Retrieve the existing workout plan by its ID
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(id).orElse(null);
        if (workoutPlan == null) {
            throw new Exception("Workout plan not found with id: " + id);
        }

        // Check if the user attempting to update the workout plan is the owner
        if (!workoutPlan.getUser().getId().equals(userId)) {
            throw new Exception("You are not authorized to update this workout plan");
        }

        // Update the workout plan fields with the new data
        workoutPlan.setWorkoutPlanName(updatedWorkoutPlan.getWorkoutPlanName());
        workoutPlan.setExercises(updatedWorkoutPlan.getExercises());
        workoutPlan.setSets(updatedWorkoutPlan.getSets());
        workoutPlan.setRepetitions(updatedWorkoutPlan.getRepetitions());
        workoutPlan.setGoal(updatedWorkoutPlan.getGoal());

        // Save the updated workout plan
        return workoutPlanRepository.save(workoutPlan);
    }

    @Override
    public void deleteWorkoutPlan(Long id, Integer userId) throws Exception {
        // Retrieve the workout plan by its ID
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(id).orElse(null);
        if (workoutPlan == null) {
            throw new Exception("Workout plan not found with id: " + id);
        }

        // Check if the user attempting to delete the workout plan is the owner
        if (!workoutPlan.getUser().getId().equals(userId)) {
            throw new Exception("You are not authorized to delete this workout plan");
        }

        // Proceed with the deletion
        workoutPlanRepository.delete(workoutPlan);
    }
}
