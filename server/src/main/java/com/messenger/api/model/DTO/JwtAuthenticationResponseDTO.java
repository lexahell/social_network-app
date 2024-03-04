package com.messenger.api.model.DTO;

public class JwtAuthenticationResponseDTO {

    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public JwtAuthenticationResponseDTO(String token) {
        this.token = token;
    }
}
