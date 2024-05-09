package com.sliit.social_media_project.controller;

import com.sliit.social_media_project.config.JwtProvider;
import com.sliit.social_media_project.models.User;
import com.sliit.social_media_project.repository.UserRepository;
import com.sliit.social_media_project.request.LoginRequest;
import com.sliit.social_media_project.response.AuthResponse;
import com.sliit.social_media_project.service.CustomerUserDetailsService;
import com.sliit.social_media_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody User user) throws Exception {

        //System.out.println(user);
        User isExist = userRepository.findByEmail(user.getEmail());
        if(isExist != null){
            throw new Exception("Email already used with another account");
        }

        User newUser = new User();

        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setGender(user.getGender());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());

        String token = JwtProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse(token, "Register Successfully");

        return response;
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody LoginRequest loginRequest) throws Exception {
        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        String token = JwtProvider.generateToken(authentication);
        return new AuthResponse(token, "Login Successfully");
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Password mismatch");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
