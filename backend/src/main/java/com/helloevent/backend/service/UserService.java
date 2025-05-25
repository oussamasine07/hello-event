package com.helloevent.backend.service;

import com.helloevent.backend.model.Role;
import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserService (
            final UserRepository userRepository,
            final AuthenticationManager authenticationManager,
            final JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User registerUser ( User user ) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save( user );

    }

    public String verify ( User user ) {

        Authentication authentication = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(),
                                user.getPassword()
                        )
                );

        if (authentication.isAuthenticated()){
            return jwtService.generateJwtToken(user);
        }

        return "Fails";
    }

    public List<User> showAllClients (String token) {

        String usernameFromToken = jwtService.extarctUsername(token.substring(7));
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        if (user.getRole() == Role.ADMIN) {
            return userRepository.getAllClients();
        } else {
            throw new Error("unauthorized action");
        }

    }

    public void deleteClient (String token, Long id) {
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        if (user.getRole() == Role.ADMIN) {
            userRepository.deleteClient(id);
        } else {
            throw new Error("unauthorized action");
        }
    }

}
















