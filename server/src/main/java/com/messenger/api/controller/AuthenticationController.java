package com.messenger.api.controller;

import com.messenger.api.model.DTO.JwtAuthenticationResponseDTO;
import com.messenger.api.model.DTO.SignInRequestDTO;
import com.messenger.api.model.DTO.SignUpRequestDTO;
import com.messenger.api.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<JwtAuthenticationResponseDTO> signUp(@RequestBody SignUpRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.signUp(request));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<JwtAuthenticationResponseDTO> signIn(@RequestBody SignInRequestDTO request) {
        return ResponseEntity.ok(authenticationService.signIn(request));
    }

    public AuthenticationController(AuthenticationService authenticationService){
        this.authenticationService = authenticationService;
    }
}
