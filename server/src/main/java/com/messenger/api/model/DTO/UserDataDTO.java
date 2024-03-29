package com.messenger.api.model.DTO;

import com.messenger.api.model.User;

public class UserDataDTO {
    private String nickname;

    private String username;

    public UserDataDTO(String nickname, String username) {
        this.nickname = nickname;
        this.username = username;
    }
    public UserDataDTO(User user) {
        this.nickname = user.getNickname();
        this.username = user.getUsername();
    }

    public String getNickname() {
        return nickname;
    }

    public String getUsername() {
        return username;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
