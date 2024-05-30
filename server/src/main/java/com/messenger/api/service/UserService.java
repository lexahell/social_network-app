package com.messenger.api.service;

import com.messenger.api.model.DTO.MessageDTO;
import com.messenger.api.model.DTO.PostDto;
import com.messenger.api.model.DTO.UserDataDTO;
import com.messenger.api.model.Post;
import com.messenger.api.model.User;
import com.messenger.api.model.User.Status;
import com.messenger.api.repository.PostRepository;
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
    private final PostRepository postRepository;

    public void connectUser(String username) {
        User storedUser = getByUsername(username);
        storedUser.setStatus(Status.ONLINE);
        userRepository.save(storedUser);
    }

    public void disconnectUser(String username) {
        User storedUser = getByUsername(username);
        storedUser.setStatus(Status.OFFLINE);
        userRepository.save(storedUser);
    }


    public User create(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("User exists");
        }
        return userRepository.save(user);
    }

    public MessageDTO subscribeTo(String username){
        User self = getByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (self.getUsername().equals(username)){
            throw new RuntimeException("Cant subscribe to yourself");
        }
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (self.getSubscriptions().contains(user)){
            throw new RuntimeException("Already subscribed to "+username);
        }
        self.getSubscriptions().add(user);
        userRepository.save(self);
        return new MessageDTO("Subscribed to "+username);
    }

    public MessageDTO unsubscribeFrom(String username){
        User self = getByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        if (self.getUsername().equals(username)){
            throw new RuntimeException("Cant unsubscribe from yourself");
        }
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (!self.getSubscriptions().contains(user)){
            throw new RuntimeException("Not subscribed to "+username);
        }
        self.getSubscriptions().remove(user);
        userRepository.save(self);
        return new MessageDTO("Unsubscribed from "+username);
    }

    public List<UserDataDTO> getSubscriptions(String username){
        List<User> users = userRepository.getUserSubscriptions(userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId());
        return users.stream().map(UserDataDTO::new).collect(Collectors.toList());
    }

    public List<UserDataDTO> getFriends(String username){
        List<User> users = userRepository.getUserFriends(userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId());
        return users.stream().map(UserDataDTO::new).collect(Collectors.toList());
    }

    public List<UserDataDTO> getSubscribers(String username){
        List<User> users = userRepository.getUserSubscribers(userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId());
        return users.stream().map(UserDataDTO::new).collect(Collectors.toList());
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

    public List<Post> getPosts(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found")).getPosts().stream().toList();
    }

    public MessageDTO createPost(PostDto postData){
        if(postData.getValue().isEmpty()){
            throw new RuntimeException("Post value cannot be empty");
        }

        User user = getByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Post post = new Post(user, postData.getValue(), postData.getTimestamp());
        post = postRepository.save(post);
        user.getPosts().add(post);
        userRepository.save(user);

        return new MessageDTO("Post created");
    }

    public MessageDTO checkRelations(String username){
        User self = getByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        if (self.getSubscriptions().contains(user)){
            if (user.getSubscriptions().contains(self)){
                return new MessageDTO("Friends");
            }else {
                return new MessageDTO("Subscribed");
            }
        }else{
            if (user.getSubscriptions().contains(self)){
                return new MessageDTO("Subscriber");
            }else {
                return new MessageDTO("None");
            }
        }
    }

    public List<UserDataDTO> findByNickname(String nickname){
        List<User> users = userRepository.getUsersByNick(nickname+"%");
        return users.stream().map(UserDataDTO::new).collect(Collectors.toList());
    }

    public UserService(UserRepository userRepository, PostRepository postRepository){
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }
}
