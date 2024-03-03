package com.messenger.api.controller;

import com.messenger.api.model.User;
import com.messenger.api.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService service;
    UserController(UserService service){
        this.service = service;
    }

    @PostMapping("add-user")
    public User addUser(@RequestBody User user){
        return  service.addUser(user);
    }

}
