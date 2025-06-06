package com.messenger.api.service;

import com.messenger.api.model.ChatMessage;
import com.messenger.api.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Сервис управления сообщениями
 */
@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;

    public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatRoomService chatRoomService) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
    }

    /**
     * Сохраняет сообщение пользователя
     * @param chatMessage  - сообщение
     */
    public ChatMessage save(ChatMessage chatMessage) {
        String chatId = chatRoomService
                .getChatRoomId(chatMessage.getSenderUsername(), chatMessage.getRecipientUsername(), true)
                .orElseThrow();
        chatMessage.setChatId(chatId);
        chatMessageRepository.save(chatMessage);
        return chatMessage;
    }

    /**
     * Возвращает список сообщенний
     * @param senderUsername - ник отправителя
     * @param recipientUsername - ник получателя
     */
    public List<ChatMessage> findChatMessages(String senderUsername, String recipientUsername) {
        Optional<String> chatId = chatRoomService.getChatRoomId(senderUsername, recipientUsername, false);
        return chatId.map(chatMessageRepository::findByChatId).orElse(new ArrayList<>());
    }
}
