package com.helloevent.backend.controller.auth;

import com.helloevent.backend.model.User;
import com.helloevent.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    private final UserService userService;

    public AdminController (
            final UserService userService
    ) {
        this.userService = userService;
    }

    @GetMapping("/clients")
    public List<User> getClients (@RequestHeader("Authorization") String token) {
        return userService.showAllClients(token);
    }

    @DeleteMapping("/clients/{id}")
    public void deleteClient (@RequestHeader("Authorization") String token, @PathVariable Long id) {
        userService.deleteClient(token, id);
    }

}











