package com.messenger.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User author;

    @Column(nullable = false, length = 1000)
    private String value;

    @Column(nullable = false)
    private Date timestamp;

    public Long getId() {
        return id;
    }

    public User getAuthor() {
        return author;
    }

    public String getValue() {
        return value;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Post(User author, String value, Date timestamp){
        this.author = author;
        this.value = value;
        this.timestamp = timestamp;
    }

    public Post(){}
}
