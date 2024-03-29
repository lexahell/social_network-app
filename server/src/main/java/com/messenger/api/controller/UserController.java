package com.messenger.api.controller;

import com.messenger.api.model.DTO.UserDataDTO;
import com.messenger.api.model.User;
import com.messenger.api.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/my-info")
    public UserDataDTO myInfo() {
        return userService.getMyInfo();
    }

    @GetMapping
    public UserDataDTO getUserData(@RequestParam(required = true) String username) {
        return new UserDataDTO(userService.getByUsername(username));
    }

    public UserController(UserService userService){
        this.userService = userService;
    }
}
