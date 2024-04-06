package com.messenger.api.service;

import com.messenger.api.model.ChatRoom;
import com.messenger.api.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository) { this.chatRoomRepository = chatRoomRepository; }

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
                    return  Optional.empty();
                });
    }
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
