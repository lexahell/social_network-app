package com.messenger.api.controller;

import com.messenger.api.model.DTO.TypingStatusDTO;
import com.messenger.api.model.TypingStatusNotification;
import com.messenger.api.model.User;
import com.messenger.api.model.UserTypingStatus;
import com.messenger.api.service.UserService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class UserTypingController {
    private final SimpMessagingTemplate messagingTemplate;

    public UserTypingController(SimpMessagingTemplate messagingTemplate, UserService userService) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/user.typing")
    public void getUserTypingStatus(@Payload TypingStatusDTO typingStatusInfo) {
        messagingTemplate.convertAndSendToUser(
                typingStatusInfo.getRecipientUsername(), "/queue/typingStatuses",
                new TypingStatusNotification(
                        typingStatusInfo.getSenderUsername(),
                        typingStatusInfo.getRecipientUsername(),
                        typingStatusInfo.getUserTypingStatus().equals("TYPING")
                                ? UserTypingStatus.TYPING
                                : UserTypingStatus.NOT_TYPING
                )
        );
    }
}
