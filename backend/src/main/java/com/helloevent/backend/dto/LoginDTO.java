package com.helloevent.backend.dto;

import com.helloevent.backend.validation.ValidUsername;
import jakarta.validation.constraints.NotBlank;

public record LoginDTO(

        @NotBlank(message = "username or email is required")
        @ValidUsername
        String username,

        @NotBlank(message = "password is required")
        String password
) {

}
