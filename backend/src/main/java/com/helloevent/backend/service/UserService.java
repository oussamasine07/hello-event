package com.helloevent.backend.service;

import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService ( final UserRepository userRepository ) {
        this.userRepository = userRepository;
    }

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User registerUser ( User user ) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save( user );

    }
}
