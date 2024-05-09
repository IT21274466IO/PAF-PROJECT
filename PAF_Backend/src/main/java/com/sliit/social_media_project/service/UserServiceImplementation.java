package com.sliit.social_media_project.service;

import com.sliit.social_media_project.config.JwtProvider;
import com.sliit.social_media_project.exceptions.UserException;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User registerUser(User user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setGender(user.getGender());
        newUser.setProfilePic(user.getProfilePic());
        newUser.setCoverPic(user.getCoverPic());
        newUser.setPassword(user.getPassword());
        newUser.setId(user.getId());

        User savedUser = userRepository.save(newUser);
        return savedUser;
    }

    @Override
    public User findUserById(Integer userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);

        if(user.isPresent()){
            return user.get();
        }

        throw new UserException("User not exist with userid" + userId);
    }

    @Override
    public User findUserByEmail(String email) {

        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User followUser(Integer reqUserId, Integer userId2) throws UserException {

        User reqUser = findUserById(reqUserId);
        User user2 = findUserById(userId2);

        user2.getFollowers().add(reqUser.getId());
        reqUser.getFollowings().add(user2.getId());

        userRepository.save(reqUser);
        userRepository.save(user2);

        return reqUser;
    }

    @Override
    public User updateUser(User user, Integer userId) throws UserException {
        if (user == null) {
            throw new IllegalArgumentException("User object cannot be null");
        }

        return userRepository.findById(userId)
                .map(oldUser -> {
                    if (user.getFirstName() != null) {
                        oldUser.setFirstName(user.getFirstName());
                    }
                    if (user.getLastName() != null) {
                        oldUser.setLastName(user.getLastName());
                    }
                    if (user.getEmail() != null) {
                        oldUser.setEmail(user.getEmail());
                    }
                    if (user.getPassword() != null) {
                        oldUser.setPassword(user.getPassword());
                    }
                    if (user.getGender() != null) {
                        oldUser.setGender(user.getGender());
                    }
                    if (user.getProfilePic() != null) {
                        oldUser.setProfilePic(user.getProfilePic());
                    }
                    if (user.getCoverPic() != null) {
                        oldUser.setCoverPic(user.getCoverPic());
                    }
                    return userRepository.save(oldUser);
                })
                .orElseThrow(() -> new UserException("User not exists with id: " + userId));
    }


    @Override
    public List<User> searchUser(String query) {
        List<User> users = userRepository.searchUserBy(query);
        return users;
    }

    @Override
    public User findUserByJwt(String jwt) {

        String email = JwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);
        return user;
    }
}
