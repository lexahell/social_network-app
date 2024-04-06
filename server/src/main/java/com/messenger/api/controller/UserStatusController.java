package com.messenger.api.controller;

import com.messenger.api.service.UserService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class UserStatusController {
    private final UserService userService;

    public UserStatusController(UserService userService) { this.userService = userService; }

    @MessageMapping("/user.connect")
    @SendTo("/user/public")
    public void connect(@Payload String username) {
        userService.connectUser(username);
    }
    @MessageMapping("/user.disconnect")
    @SendTo("/user/public")
    public void disconnect(@Payload String username) {
        userService.disconnectUser(username);
    }
}
