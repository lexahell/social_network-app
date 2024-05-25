package com.messenger.api.controller;

import com.messenger.api.model.DTO.MessageDTO;
import com.messenger.api.model.DTO.UserDataDTO;
import com.messenger.api.service.UserService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MessageDTO> subscribeTo(@PathVariable String username) {
        return ResponseEntity.ok(userService.subscribeTo(username));
    }

    @PostMapping("/unsubscribe/{username}")
    public ResponseEntity<MessageDTO> unsubscribeFrom(@PathVariable String username) {
        return ResponseEntity.ok(userService.unsubscribeFrom(username));
    }

    @GetMapping("/subscriptions/{username}")
    public ResponseEntity<List<UserDataDTO>> getSubscriptions(@PathVariable String username) {
        return ResponseEntity.ok(userService.getSubscriptions(username));
    }

    @GetMapping("/friends/{username}")
    public ResponseEntity<List<UserDataDTO>> getFriends(@PathVariable String username) {
        return ResponseEntity.ok(userService.getFriends(username));
    }

    @GetMapping("/subscribers/{username}")
    public ResponseEntity<List<UserDataDTO>> getSubscribers(@PathVariable String username) {
        return ResponseEntity.ok(userService.getSubscribers(username));
    }

    @GetMapping("/all")
    public List<UserDataDTO> getAllUsers() { return userService.getAllUsers(); }

    @GetMapping("/{username}")
    public ResponseEntity<UserDataDTO> getUserData(@PathVariable String username) {
        return ResponseEntity.ok(new UserDataDTO(userService.getByUsername(username)));
    }

    public UserController(UserService userService){
        this.userService = userService;
    }
}
