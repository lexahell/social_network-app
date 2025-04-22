package com.messenger.api.service;

import com.messenger.api.model.DTO.JwtAuthenticationResponseDTO;
import com.messenger.api.model.DTO.SignInRequestDTO;
import com.messenger.api.model.DTO.SignUpRequestDTO;
import com.messenger.api.model.User;
import com.messenger.api.model.User.Role;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Сервис аутентификации и авторизации
 */
@Service
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    /**
     * Возвращает JWT-токен для аутентификации/авторизации
     * @param request - запрос на вход
     */
    public JwtAuthenticationResponseDTO signUp(SignUpRequestDTO request) {

        User user = new User(request.getNickname(),
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                Role.USER);

        userService.create(user);

        String jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponseDTO(jwt);
    }

    /**
     * Регистрирует пользователя в системе
     * @param request - запрос на регистрацию
     */
    public JwtAuthenticationResponseDTO signIn(SignInRequestDTO request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        UserDetails user = userService
                .userDetailsService()
                .loadUserByUsername(request.getUsername());

        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponseDTO(jwt);
    }

    public AuthenticationService(UserService userService, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager){
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }
}
