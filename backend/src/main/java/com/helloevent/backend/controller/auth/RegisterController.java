package com.helloevent.backend.controller.auth;

import com.helloevent.backend.dto.RegisterDTO;
import com.helloevent.backend.model.User;
import com.helloevent.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/register")
@CrossOrigin
public class RegisterController {

    private final UserService userService;

    public RegisterController ( final UserService userService ) {
        this.userService = userService;
    }

    @PostMapping
    public User registerUser (@RequestBody RegisterDTO userDTO) {
        User user = new User();

        user.setFirstName(userDTO.first_name());
        user.setLastName(userDTO.last_name());
        user.setUsername(userDTO.username());
        user.setPassword(userDTO.password());
        user.setEmail(userDTO.email());
        user.setRole(userDTO.role());

        return userService.registerUser(user);
    }

}
