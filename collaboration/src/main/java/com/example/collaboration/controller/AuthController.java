package com.example.collaboration.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.collaboration.model.User;
import com.example.collaboration.service.UserService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());

        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            // Replace with actual JWT token generation
            String jwtToken = "JWT_TOKEN_HERE";

            // Manually create a JSON response as a string
            String response = String.format(
                    "{\"message\": \"Login successful\", \"token\": \"%s\"}",
                    jwtToken
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            // Manually create an error response
            String errorResponse = "{\"error\": \"Unauthorized\", \"message\": \"Invalid credentials\"}";
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }
} 