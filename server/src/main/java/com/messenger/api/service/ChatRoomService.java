package com.messenger.api.service;

import com.messenger.api.model.ChatRoom;
import com.messenger.api.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Сервис для управления чатами
 */
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) { this.chatRoomRepository = chatRoomRepository; }

    /**
     * Возвращает чат
     * @param senderUsername - ник отправителя
     * @param recipientUsername - ник получателя
     * @param createNewRoomIfNotExists - флаг, если false не создает чат если такой уже существует
     */
    public Optional<String> getChatRoomId(
            String senderUsername,
            String recipientUsername,
            boolean createNewRoomIfNotExists
    ) {
        return chatRoomRepository.findBySenderUsernameAndRecipientUsername(senderUsername, recipientUsername)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    if (createNewRoomIfNotExists) {
                        String chatId = createChatId(senderUsername, recipientUsername);
                        return Optional.of(chatId);
                    }
                    return Optional.empty();
                });
    }

    /**
     * Создает чат
     * @param senderUsername - ник отправителя
     * @param recipientUsername - ник получателя
     */
    private String createChatId(String senderUsername, String recipientUsername) {
        String chatId = String.format("%s_%s", senderUsername, recipientUsername);

        ChatRoom senderRecipient = new ChatRoom(
                chatId,
                senderUsername,
                recipientUsername
        );

        ChatRoom recipientSender = new ChatRoom(
                chatId,
                recipientUsername,
                senderUsername
        );

        chatRoomRepository.save(senderRecipient);
        chatRoomRepository.save(recipientSender);
        return chatId;
    }
}
