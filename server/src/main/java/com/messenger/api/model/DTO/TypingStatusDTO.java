package com.messenger.api.model.DTO;

public class TypingStatusDTO {
    private String senderUsername;
    private String recipientUsername;
    private String userTypingStatus;

    public TypingStatusDTO(String senderUsername, String recipientUsername, String userTypingStatus) {
        this.senderUsername = senderUsername;
        this.recipientUsername = recipientUsername;
        this.userTypingStatus = userTypingStatus;
    }

    public TypingStatusDTO() {}

    public String getSenderUsername() {
        return senderUsername;
    }

    public String getRecipientUsername() {
        return recipientUsername;
    }

    public String getUserTypingStatus() {
        return userTypingStatus;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public void setRecipientUsername(String recipientUsername) {
        this.recipientUsername = recipientUsername;
    }

    public void setUserTypingStatus(String userTypingStatus) {
        this.userTypingStatus = userTypingStatus;
    }
}
