package com.messenger.api.controller;

import com.messenger.api.model.DTO.JwtAuthenticationResponseDTO;
import com.messenger.api.model.DTO.SignInRequestDTO;
import com.messenger.api.model.DTO.SignUpRequestDTO;
import com.messenger.api.service.AuthenticationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public JwtAuthenticationResponseDTO signUp(@RequestBody SignUpRequestDTO request) {
        return authenticationService.signUp(request);
    }

    @PostMapping("/sign-in")
    public JwtAuthenticationResponseDTO signIn(@RequestBody SignInRequestDTO request) {
        return authenticationService.signIn(request);
    }

    public AuthenticationController(AuthenticationService authenticationService){
        this.authenticationService = authenticationService;
    }
}
