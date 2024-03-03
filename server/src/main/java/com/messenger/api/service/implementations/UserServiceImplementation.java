package com.messenger.api.service.implementations;

import com.messenger.api.model.User;
import com.messenger.api.repository.UserRepository;
import com.messenger.api.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

    private static BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);

    private final UserRepository userRepository;

    @Override
    public User addUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    UserServiceImplementation(UserRepository userRepository){
        this.userRepository = userRepository;
    }
}
