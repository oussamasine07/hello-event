package com.helloevent.backend.service;

import com.helloevent.backend.dto.AuthUserDTO;
import com.helloevent.backend.dto.UpdateProfileDTO;
import com.helloevent.backend.mapper.UserMapper;
import com.helloevent.backend.model.Role;
import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
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
    private final UserMapper userMapper;

    public UserService (
            final UserRepository userRepository,
            final AuthenticationManager authenticationManager,
            final JwtService jwtService,
            final UserMapper userMapper
    ) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userMapper = userMapper;
    }

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User registerUser ( User user ) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole(Role.CLIENT);
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
            AuthUserDTO authUser = this.getAuthenticatedUser(user.getUsername());
            return jwtService.generateJwtToken(authUser);
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

    public AuthUserDTO getAuthenticatedUser ( String usernameOrEmail ) {
        User authenticatedUser = userRepository.getUserByUsernameOrByEmail( usernameOrEmail );
        return userMapper.toDTO(authenticatedUser);
    }

    public String updateProfileService ( UpdateProfileDTO updateProfileDTO, String token ) {

        String username = jwtService.extarctUsername( token.substring(7) );
        System.out.println("***************************************************************************");
        System.out.println(username);
        System.out.println("***************************************************************************");
        User authenticatedUser = userRepository.getUserByUsernameOrByEmail( username );

        authenticatedUser.setFirstName(updateProfileDTO.firstName());
        authenticatedUser.setLastName(updateProfileDTO.lastName());
        authenticatedUser.setUsername(updateProfileDTO.username());
        authenticatedUser.setEmail(updateProfileDTO.email());

        userRepository.save(authenticatedUser);

        AuthUserDTO authUserDTO = userMapper.toDTO( authenticatedUser );

        return jwtService.generateJwtToken( authUserDTO );
    }

}
















