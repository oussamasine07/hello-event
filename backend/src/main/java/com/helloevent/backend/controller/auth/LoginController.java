package com.helloevent.backend.controller.auth;

import com.helloevent.backend.dto.LoginDTO;
import com.helloevent.backend.model.User;
import com.helloevent.backend.service.JwtService;
import com.helloevent.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class LoginController {

    private final UserService userService;

    public LoginController (
            final UserService userService
    ) {
        this.userService = userService;
    }

    @GetMapping("/testing")
    public String testLogin () {
        return "hello login";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@Valid @RequestBody LoginDTO loginDTO ) {
        User user = new User();

        user.setUsername(loginDTO.username());
        user.setPassword(loginDTO.password());

        return userService.verify(user);
    }

}











