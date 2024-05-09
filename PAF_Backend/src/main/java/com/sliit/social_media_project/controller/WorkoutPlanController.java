package com.sliit.social_media_project.controller;

import com.sliit.social_media_project.models.WorkoutPlan;
import com.sliit.social_media_project.service.WorkoutPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping("/workout_plans/user/{userId}")
    public ResponseEntity<?> createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan, @PathVariable Integer userId) {
        try {
            WorkoutPlan newWorkoutPlan = workoutPlanService.saveWorkoutPlan(workoutPlan, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(newWorkoutPlan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/workout_plans/{id}")
    public ResponseEntity<?> getWorkoutPlanById(@PathVariable Long id) {
        WorkoutPlan workoutPlan = workoutPlanService.getWorkoutPlanById(id);
        if (workoutPlan != null) {
            // If workoutPlan is found, return it with OK status
            return ResponseEntity.ok(workoutPlan);
        } else {
            // If workoutPlan is not found, return not found status
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/workout_plans/all")
    public ResponseEntity<List<WorkoutPlan>> getAllWorkoutPlans() {
        List<WorkoutPlan> workoutPlans = workoutPlanService.getAllWorkoutPlans();
        return ResponseEntity.ok(workoutPlans);
    }

    @PutMapping("/workout_plans/{id}/user/{userId}")
    public ResponseEntity<?> updateWorkoutPlan(@PathVariable Long id, @RequestBody WorkoutPlan updatedWorkoutPlan, @PathVariable Integer userId) {
        try {
            WorkoutPlan workoutPlan = workoutPlanService.updateWorkoutPlan(id, updatedWorkoutPlan, userId);
            return ResponseEntity.ok(workoutPlan);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @DeleteMapping("/workout_plans/{id}/user/{userId}")
    public ResponseEntity<?> deleteWorkoutPlan(@PathVariable Long id, @PathVariable Integer userId) {
        try {
            workoutPlanService.deleteWorkoutPlan(id, userId);
            return ResponseEntity.ok("Workout plan deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
