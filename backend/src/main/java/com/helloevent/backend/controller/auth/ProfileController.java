package com.helloevent.backend.controller.auth;

import com.helloevent.backend.dto.UpdateProfileDTO;
import com.helloevent.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class ProfileController {

    private final UserService userService;

    ProfileController (
            final UserService userService
    ) {
        this.userService = userService;
    }

    @PutMapping("/update-profile")
    public String updateProfile (@RequestBody UpdateProfileDTO updateProfileDTO, @RequestHeader("Authorization") String token) {

        return userService.updateProfileService(updateProfileDTO, token);
    }


}















