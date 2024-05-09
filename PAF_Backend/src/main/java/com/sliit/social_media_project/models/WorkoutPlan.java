package com.sliit.social_media_project.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Workout_Plans")
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;
    private String workoutPlanName;
    private String Exercises;
    private String Sets;
    private String Repetitions;
    private String Goal;

    // Default constructor
    public WorkoutPlan() {
    }

    // Parameterized constructor
    public WorkoutPlan(String workoutPlanName, String Exercises, String Sets, String Repetitions, String Goal) {
        this.workoutPlanName = workoutPlanName;
        this.Exercises = Exercises;
        this.Sets = Sets;
        this.Repetitions = Repetitions;
        this.Goal = Goal;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getWorkoutPlanName() {
        return workoutPlanName;
    }

    public void setWorkoutPlanName(String workoutPlanName) {
        this.workoutPlanName = workoutPlanName;
    }

    public String getExercises() {
        return Exercises;
    }

    public void setExercises(String Exercises) {
        this.Exercises = Exercises;
    }

    public String getSets() {
        return Sets;
    }

    public void setSets(String Sets) {
        this.Sets = Sets;
    }

    public String getRepetitions() {
        return Repetitions;
    }

    public void setRepetitions(String Repetitions) {
        this.Repetitions = Repetitions;
    }

    public String getGoal() {
        return Goal;
    }

    public void setGoal(String Goal) {
        this.Goal = Goal;
    }
}
