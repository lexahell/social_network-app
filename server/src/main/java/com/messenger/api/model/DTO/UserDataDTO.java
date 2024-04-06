package com.messenger.api.model.DTO;

import com.messenger.api.model.User.Status;
import com.messenger.api.model.User;

public class UserDataDTO {
    private String nickname;
    private String username;
    private Status status;

    public UserDataDTO(String nickname, String username, Status status) {
        this.nickname = nickname;
        this.username = username;
        this.status = status;
    }
    public UserDataDTO(User user) {
        this.nickname = user.getNickname();
        this.username = user.getUsername();
        this.status = user.getStatus();
    }

    public String getNickname() {
        return nickname;
    }

    public String getUsername() {
        return username;
    }

    public Status getStatus() { return status; }
}
