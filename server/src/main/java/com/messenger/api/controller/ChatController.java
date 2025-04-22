package com.messenger.api.controller;

import com.messenger.api.model.ChatMessage;
import com.messenger.api.model.ChatNotification;
import com.messenger.api.service.ChatMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * Контроллер чатов
 */
@Controller
public class ChatController {
   private final SimpMessagingTemplate messagingTemplate;
   private final ChatMessageService chatMessageService;

   public ChatController(SimpMessagingTemplate messagingTemplate, ChatMessageService chatMessageService) {
       this.messagingTemplate = messagingTemplate;
       this.chatMessageService = chatMessageService;
   }

   @MessageMapping("/chat")
   public void processMessage(@Payload ChatMessage chatMessage) {
       ChatMessage savedMsg = chatMessageService.save(chatMessage);
       messagingTemplate.convertAndSendToUser(
               chatMessage.getRecipientUsername(), "/queue/messages",
               new ChatNotification(
                       savedMsg.getSenderUsername(),
                       savedMsg.getRecipientUsername(),
                       savedMsg.getContent()
               )
       );
   }

   @GetMapping("/messages/{senderUsername}/{recipientUsername}")
   public ResponseEntity<List<ChatMessage>> findChatMessages(@PathVariable String senderUsername,
                                                             @PathVariable String recipientUsername) {
       return ResponseEntity
               .ok(chatMessageService.findChatMessages(senderUsername, recipientUsername));
   }
}
