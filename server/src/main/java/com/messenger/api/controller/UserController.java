package com.messenger.api.controller;

import com.messenger.api.model.DTO.MessageDTO;
import com.messenger.api.model.DTO.UserDataDTO;
import com.messenger.api.model.User;
import com.messenger.api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/my-info")
    public ResponseEntity<UserDataDTO> myInfo() {
        return ResponseEntity.ok(userService.getMyInfo());
    }

    @PostMapping("/subscribe/{username}")
    public ResponseEntity<MessageDTO> subscribeTo(@RequestParam(required = true) String username) {
        return ResponseEntity.ok(userService.subscribeTo(username));
    }

    @GetMapping("/all")
    public List<UserDataDTO> getAllUsers() { return userService.getAllUsers(); }

    @GetMapping
    public ResponseEntity<UserDataDTO> getUserData(@RequestParam(required = true) String username) {
        return ResponseEntity.ok(new UserDataDTO(userService.getByUsername(username)));
    }

    public UserController(UserService userService){
        this.userService = userService;
    }
}
