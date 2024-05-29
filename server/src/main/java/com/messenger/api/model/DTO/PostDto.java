package com.messenger.api.model.DTO;

import com.messenger.api.model.Post;

import java.util.Date;

public class PostDto {
    private String value;
    private Date timestamp;

    public String getValue() {
        return value;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public PostDto(String value, Date timestamp) {
        this.value = value;
        this.timestamp = timestamp;
    }

    public PostDto(Post post) {
        this.value = post.getValue();
        this.timestamp = post.getTimestamp();
    }
}
