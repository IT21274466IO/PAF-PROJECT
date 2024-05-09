package com.sliit.social_media_project.controller;

import com.sliit.social_media_project.exceptions.UserException;
import com.sliit.social_media_project.repository.UserRepository;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping("/api/users")
    public List<User> getUser() {
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{userId}")
    public User getUserById(@PathVariable("userId") Integer id) throws UserException {

        User user = userService.findUserById(id);
        return user;
    }


    //Method for creating a new user
    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) {

        User savedUser = userService.registerUser(user);
        return savedUser;
    }

    @PutMapping("/api/users/updateUser")
    public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws UserException {

        User reqUser = userService.findUserByJwt(jwt);

        User updatedUser = userService.updateUser(user, reqUser.getId());
        return updatedUser;
    }

    @DeleteMapping("api/deleteUser/{userId}")
    public String deleteUser(@PathVariable("userId") Integer userId) throws UserException {

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()){
            throw new UserException("User not exists with id: " + userId);
        }

        userRepository.delete(user.get());

        return "User deleted successfully with id: " + userId;
    }

    @PutMapping("/api/users/follow/{userId2}")
    public User followUserHandler( @RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws UserException {
        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.followUser(reqUser.getId(), userId2);
        return user;
    }

    @GetMapping("/api/users/search")
    public ResponseEntity<?> searchUser(@RequestParam("query") String query){
        List<User> users = userService.searchUser(query);
        // Check if the returned list is empty
        if (users.isEmpty()) {
            // Return an error response with appropriate status code and message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No users found with the given name or email: " + query);
        }
        return ResponseEntity.ok(users);
    }

//    @GetMapping("/api/users/profile")
//    public User getUserFromToken(@RequestHeader("Authorization") String jwt) {
//
//        //String email = userService.getEmailFromJwtToken(jwt);
//        User user = userService.findUserByJwt(jwt);
//        //System.out.println("User's JWT token = " + jwt);
//        user.setPassword(null);
//        return user;
//    }


    @GetMapping("/api/users/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt) {
        // Remove "Bearer " prefix if present
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }
        User user = userService.findUserByJwt(jwt);
        user.setPassword(null);
        return user;
    }

}
