package com.messenger.api.model;

public class TypingStatusNotification {
    private String senderUsername;

    private String recipientUsername;

    private UserTypingStatus userTypingStatus;

    public void setSenderUsername(String senderUsername) { this.senderUsername = senderUsername; }

    public void setRecipientUsername(String recipientUsername) { this.recipientUsername = recipientUsername; }

    public void setTypingStatus(UserTypingStatus userTypingStatus) { this.userTypingStatus = userTypingStatus; }

    public String getSenderUsername() { return senderUsername; }

    public String getRecipientUsername() { return recipientUsername; }

    public UserTypingStatus getUserTypingStatus() { return userTypingStatus; }

    public TypingStatusNotification() {}

    public TypingStatusNotification(String senderUsername, String recipientUsername, UserTypingStatus userTypingStatus) {
        this.senderUsername = senderUsername;
        this.recipientUsername = recipientUsername;
        this.userTypingStatus = userTypingStatus;
    }
}
