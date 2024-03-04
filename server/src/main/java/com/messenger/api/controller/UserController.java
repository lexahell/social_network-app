package com.messenger.api.controller;

import com.messenger.api.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/example")
public class UserController {
    private final UserService service;

    @GetMapping
    public String example() {
        return "Hello, world!";
    }

    public UserController(UserService service){
        this.service = service;
    }
}
