package com.messenger.api.model.DTO;

public class SignUpRequestDTO {
    private String nickname;

    private String username;

    private String password;

    public String getNickname() {
        return nickname;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public SignUpRequestDTO(String nickname, String username, String password) {
        this.nickname = nickname;
        this.username = username;
        this.password = password;
    }
}
