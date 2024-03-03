package com.messenger.api.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nickname;
    @Column(unique = true)
    private String login;
    private String password;
    private String accessKey;

    //@OneToMany(mappedBy="friend")
    //private Set<Friend> friends;

    public String getNickname() {
        return nickname;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }


    public User() {}
    public User(String nickname, String login, String password, String accessKey) {
        this.nickname = nickname;
        this.login = login;
        this.password = password;
        this.accessKey = accessKey;
    }
}
