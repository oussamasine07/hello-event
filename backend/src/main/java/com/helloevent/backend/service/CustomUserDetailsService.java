package com.helloevent.backend.service;

import com.helloevent.backend.model.User;
import com.helloevent.backend.model.UserPrincipal;
import com.helloevent.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(
            final UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail)
            throws UsernameNotFoundException
    {

        User user = userRepository.getUserByUsernameOrByEmail(usernameOrEmail);

//        System.out.println("*********************************************");
//        System.out.println(user.toString());
//        System.out.println("*********************************************");

        if ( user == null ) {
            System.out.println("user not found");
            throw new UsernameNotFoundException("this user is not found");
        }

        return new UserPrincipal(user);
    }
}
