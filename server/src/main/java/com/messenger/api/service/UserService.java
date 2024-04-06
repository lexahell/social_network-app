package com.messenger.api.service;

import com.messenger.api.model.DTO.UserDataDTO;
import com.messenger.api.model.User;
import com.messenger.api.model.User.Status;
import com.messenger.api.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public void connectUser(String username) {
        User storedUser = getByUsername(username);
        storedUser.setStatus(Status.ONLINE);
        save(storedUser);
    }

    public void disconnectUser(String username) {
        User storedUser = getByUsername(username);
        storedUser.setStatus(Status.OFFLINE);
        save(storedUser);
    }
    public User create(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("User exists");
        }
        return save(user);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<UserDataDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserDataDTO::new).collect(Collectors.toList());
    }
    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }

    public UserDataDTO getMyInfo() {
        return new UserDataDTO(getByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
    }

    UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
}
